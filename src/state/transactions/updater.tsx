import { useCallback, useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { retry, RetryableError, RetryOptions } from 'utils/retry'
import { updateBlockNumber, setTxHash } from '../block/actions'
import { useCloseModals, useBlockNumber } from '../block/hooks'
import { checkedTransaction, finalizeTransaction } from './actions'
import { notification } from 'antd'


interface TxInterface {
  addedTime: number
  receipt?: Record<string, any>
  lastCheckedBlockNumber?: number
}

export function shouldCheck(lastBlockNumber: number, tx: TxInterface): boolean {
  if (tx.receipt) return false
  if (!tx.lastCheckedBlockNumber) return true
  const blocksSinceCheck = lastBlockNumber - tx.lastCheckedBlockNumber
  if (blocksSinceCheck < 1) return false
  const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60
  if (minutesPending > 60) {
    // every 10 blocks if pending for longer than an hour
    return blocksSinceCheck > 9
  } else if (minutesPending > 5) {
    // every 3 blocks if pending more than 5 minutes
    return blocksSinceCheck > 2
  } else {
    // otherwise every block
    return true
  }
}

const DEFAULT_RETRY_OPTIONS: RetryOptions = { n: 3, minWait: 1000, maxWait: 10000 }
export default function Updater(): null {
  const { chainId, library } = useActiveWeb3React()

  const lastBlockNumber = useBlockNumber()
  const closeModal = useCloseModals()

  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state.transactions)

  const transactions = useMemo(() => (chainId ? state[chainId] ?? {} : {}), [chainId, state])

  const getReceipt = useCallback(
    (hash: string) => {
      if (!library || !chainId) throw new Error('No library or chainId')
      const retryOptions = DEFAULT_RETRY_OPTIONS
      return retry(
        () =>
          library.getTransactionReceipt(hash).then((receipt) => {
            if (receipt === null) {
              console.debug('Retrying for hash', hash)
              throw new RetryableError()
            }
            return receipt
          }),
        retryOptions
      )
    },
    [chainId, library]
  )
 
  useEffect(() => {
    if (!chainId || !library || !lastBlockNumber) return
    Object.keys(transactions)
      .filter((hash) => shouldCheck(lastBlockNumber, transactions[hash]))
      .map((hash) => {
        library
          .getTransactionReceipt(hash)
          .then((receipt) => {
            if (receipt) {
              dispatch(
                finalizeTransaction({
                  chainId,
                  hash,
                  receipt: {
                    blockHash: receipt.blockHash,
                    blockNumber: receipt.blockNumber,
                    contractAddress: receipt.contractAddress,
                    from: receipt.from,
                    status: receipt.status,
                    to: receipt.to,
                    transactionHash: receipt.transactionHash,
                    transactionIndex: receipt.transactionIndex,
                  },
                })
              )

              if (receipt.status === 1) {
                closeModal()
                dispatch(setTxHash({hash: receipt.transactionHash}))
                console.log('receipt.status==', receipt)
                notification['success']({
                    message: 'Notification Title',
                    description: 'Contract enabled - you can now purchase tickets',
                })
              } else {
                closeModal()
                notification['error']({
                    message: 'Notification Title',
                    description: 'Fail',
                })
              }

              // the receipt was fetched before the block, fast forward to that block to trigger balance updates
              if (receipt.blockNumber > lastBlockNumber) {
                dispatch(updateBlockNumber({ chainId, blockNumber: receipt.blockNumber }))
              }
            } else {
              dispatch(checkedTransaction({ chainId, hash, blockNumber: lastBlockNumber }))
            }
          })
          .catch((error) => {
            if (!error.isCancelledError) {
              console.error(`Failed to check transaction hash: ${hash}`, error)
            }
          })
      })
  }, [chainId, library, transactions, lastBlockNumber, dispatch, getReceipt])

  return null
}

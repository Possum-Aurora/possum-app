import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { AppState } from '../index'
import { setOpenModal, setTxHash } from './actions'

export function useBlockNumber(): number | undefined {
  const { chainId } = useActiveWeb3React()

  return useAppSelector((state: AppState) => state.application.blockNumber[chainId ?? -1])
}

export function useOpenModal(): () => void {
  const dispatch = useAppDispatch()
  return useCallback(() => dispatch(setOpenModal({openModal: true})), [dispatch])
}

export function useCloseModals(): () => void {
  const dispatch = useAppDispatch()
  return useCallback(() => dispatch(setOpenModal({openModal: false})), [dispatch])
}

export function useSetTxHash(hash:string): (hash: string) => void {
  const dispatch = useAppDispatch()
  return useCallback(() => dispatch(setTxHash({hash})), [dispatch])
} 

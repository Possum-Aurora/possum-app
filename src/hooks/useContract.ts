import { Contract } from '@ethersproject/contracts'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useMemo } from 'react'
import { CHAINID } from 'constants/index'
import { getContract } from 'utils'
import { getPossumAddress } from 'utils/addressHelpers'
import POSSUM_ABI from 'abis/possum.json'
import multiCallAbi from 'abis/Multicall.json'
import { MULTICALL2_ADDRESSES } from 'constants/addressMap'
import ERC20_ABI from 'abis/erc20.json'
import { tokenAddressMap } from 'constants/tokenAddressMap'
import { SupportedChainIdList } from 'connectors/NetworkConnector'

// returns null on errors
function useContract(addressOrAddressMap: string | { [chainId: number]: string } | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
    const { library, account, chainId } = useActiveWeb3React()
    return useMemo(() => {
        if (!addressOrAddressMap || !ABI || !library || !chainId) return null
        let address: string | undefined
        if (SupportedChainIdList.includes(chainId)) {
            address = getPossumAddress(chainId)
        } else if (typeof addressOrAddressMap === 'string') {
            address = addressOrAddressMap
        }
        if (!address) return null
        try {
            return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
        } catch (error) {
            console.error('Failed to get contract', error)
            return null
        }
    }, [addressOrAddressMap, ABI, library, withSignerIfPossible, account, chainId])
}

export const usePossumContract = (chaninId: number = CHAINID, withSignerIfPossible?: boolean) => {
    return useContract(getPossumAddress(chaninId), POSSUM_ABI, withSignerIfPossible)
}

function useSingerContract (addressOrAddressMap: string | { [chainId: number]: string } | undefined, abi: any) {
    const { library, account, chainId } = useActiveWeb3React()
    return useMemo(() => {
        if (!addressOrAddressMap || !abi || !library || !chainId) return null
        let address: string | undefined
        if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
        else address = addressOrAddressMap[chainId]
        if (!address && !account) return null
        try {
            return getContract(address, abi, library, account ? account : undefined)
            // if (account) {
            //     const providerInstance = library.getSigner(account)
            //     return new ethers.Contract(address, abi, providerInstance)
            // } else {
            //     return new ethers.Contract(address, abi)
            // }
        } catch (error) {
            console.error('Failed to get contract', error)
            return null
        }
    }, [addressOrAddressMap, abi, library, account, chainId])
}

export const usePossumSingerContract = (chaninId: number = CHAINID) => {
    return useContract(getPossumAddress(chaninId), POSSUM_ABI)
}

export function useMulticall2Contract(): Contract | null {
    return useContract(MULTICALL2_ADDRESSES, multiCallAbi, false)
}

export function usePossumApproveContract(token: string): Contract | null {
    let address = tokenAddressMap[token]
    return useSingerContract(address, ERC20_ABI)
}

export function useClaimApproveContract(address: string): Contract | null {
    return useSingerContract(address, ERC20_ABI)
}
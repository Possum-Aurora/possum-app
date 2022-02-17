import { useEffect, useState, useRef } from 'react'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { simpleRpcProvider } from 'utils/providers'

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 * library	当前连接的library
 * deactivate	断开连接的方法
 * chainId	当前连接的链id
 * account	当前连接的钱包账户地址
 * active	当前连接的状态，是否连接
 */
const useWeb3Provider = (): ethers.providers.JsonRpcProvider | ethers.providers.Web3Provider => {
  const { library, chainId, account, active } = useWeb3React() // get current connect library and base info
  console.log(`chainId1111==${chainId}, account==${account}, active==${active}`)
  const refEth = useRef(library)
  const [provider, setprovider] = useState(library || simpleRpcProvider)

  useEffect(() => {
    if (library !== refEth.current) {
      setprovider(library || simpleRpcProvider)
      refEth.current = library
    }
  }, [library])

  return provider
}

export default useWeb3Provider

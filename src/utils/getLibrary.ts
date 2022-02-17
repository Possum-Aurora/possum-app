import { Web3Provider } from '@ethersproject/providers'
import { ethers } from 'ethers'
const POLLING_INTERVAL = 12000

export default function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL
  return library
}

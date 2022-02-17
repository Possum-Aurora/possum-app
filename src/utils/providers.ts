import { ethers } from 'ethers'
import { RPC_URL } from 'constants/index'

export const simpleRpcProvider: any = new ethers.providers.StaticJsonRpcProvider(RPC_URL)

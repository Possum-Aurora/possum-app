import POSSUM_ABI from 'abis/possum.json'
import { getPossumAddress } from 'utils/addressHelpers'
import { CHAINID } from 'constants/index'
// import { getContract } from 'utils'
import { Web3Provider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { simpleRpcProvider } from 'utils/providers'


const getContract = (address: string, abi: any,  signer?: ethers.Signer | ethers.providers.Provider) => {
    const signerOrProvider = signer ?? simpleRpcProvider
    return new ethers.Contract(address, abi, signerOrProvider)
}

export const getPossumContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
    return getContract(address, POSSUM_ABI, signer)
}
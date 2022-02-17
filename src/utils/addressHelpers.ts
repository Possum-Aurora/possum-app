import addressMap from 'constants/addressMap'

export const getAddress = (contractAddressMap: any, chainId: number) => {
    return contractAddressMap[chainId]
}

export const getPossumAddress = (chainId: number) => {
    return getAddress(addressMap, chainId)
  }
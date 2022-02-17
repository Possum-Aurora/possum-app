import polygonTokens from './polygonTokens'
import auroraTokens from './auroraTokens'
import { CHAINID } from 'constants/index'
import { SupportedChainId, ViewBlockScan } from 'connectors/NetworkConnector'

export const getTokenList = (chainId: number = CHAINID ) => {
    if (chainId === SupportedChainId.POLYGON) {
        return polygonTokens
    } else if (chainId === SupportedChainId.AURORA) {
        return auroraTokens
    } else {
        return polygonTokens
    }
}

export const getBlockExplorer = (chainId: number = CHAINID, hash: string ) => {
    let url: string = ''
    if (chainId === SupportedChainId.POLYGON) {
        url = ViewBlockScan[SupportedChainId.POLYGON]
        return `${url}/tx/${hash}`
    } else if (chainId === SupportedChainId.AURORA) {
        url = ViewBlockScan[SupportedChainId.AURORA]
    }
    return `${url}/tx/${hash}`
}
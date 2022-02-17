import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

export enum SupportedChainId {
  POLYGON = 80001, // 137
  AURORA = 1313161555 // 1313161554
}

export const SupportedChainIdList = [ 80001, 1313161555 ] // 80001 137

export const NETWORK_URLS: {
  [chainId in SupportedChainId]: string
} = {
  [SupportedChainId.POLYGON]: `https://rpc-mumbai.maticvigil.com`, // https://polygon-rpc.com/
  [SupportedChainId.AURORA]: `https://testnet.aurora.dev` // https://mainnet.aurora.dev
}

export const ViewBlockScan: {
  [chainId in SupportedChainId]: string
} = {
  [SupportedChainId.POLYGON]: `https://polygonscan.com`, // https://polygon-rpc.com/
  [SupportedChainId.AURORA]: `https://explorer.testnet.aurora.dev` // https://mainnet.aurora.dev
}

const SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.POLYGON,
  SupportedChainId.AURORA
]

export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
})


export const walletconnect = new WalletConnectConnector({
  rpc: NETWORK_URLS,
  qrcode: true,
  supportedChainIds: SUPPORTED_CHAIN_IDS,
  bridge: '',
})

export const connectorsByName:any = { 
  'Injected': injected,
  'WalletConnect': walletconnect
}
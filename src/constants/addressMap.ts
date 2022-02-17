import { SupportedChainId } from 'connectors/NetworkConnector'

type AddressMap = { [chainId: number]: string }

export const MULTICALL2_ADDRESSES: AddressMap = {
    [SupportedChainId.POLYGON]: '0x81e988Efa0Ac42cbA4370C5D2ae4723dc1e0D54c',
    [SupportedChainId.AURORA]: '0xd6Df20B36825552B4EB004690185542972B1F98d',
}

// 不同的合约部署到不同链上对应着不同的合约地址
const addressMap = {
    [SupportedChainId.POLYGON]: '0x81e988Efa0Ac42cbA4370C5D2ae4723dc1e0D54c',
    [SupportedChainId.AURORA]: '0xd6Df20B36825552B4EB004690185542972B1F98d',
}

export default addressMap
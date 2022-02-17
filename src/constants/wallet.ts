
import METAMASK_ICON_URL from '@/assets/images/metamask.png'
import WALLETCONNECT_ICON_URL from '@/assets/images/walletConnectIcon.svg'

export interface WalletInfo {
    name: string,
    label: string,
    iconURL: string,
    description: string,
    href: string | '',
    primary?: true,
    mobile?: true,
    mobileOnly?: true,
}

export const SUPPORTED_WALLETS: Array<WalletInfo> = [
    {
        name: 'Injected',
        label: 'Metamask',
        iconURL: METAMASK_ICON_URL,
        description: 'Easy-to-use browser extension.',
        href: '',
    },
    {
        name: 'WalletConnect',
        label: 'Walletconnect',
        iconURL: WALLETCONNECT_ICON_URL,
        description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
        href: '',
        mobile: true,
    }
]

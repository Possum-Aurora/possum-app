import styled from "styled-components"
import { FormattedMessage } from 'react-intl'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useRef } from "react"
import ConectWalletModal from "../Modal/ConectWalletModal"

const SwitchWalletBox = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 20px;
    height: 40px;
    background: var(--switchWalletBgColor);
    color: var(--whiteColor);
    border-radius: 23px;
    border: 1px solid var(--switchWalletBorderBgColor);
    &:hover {
        border: 1px solid var(--whiteColor);
        color: var(--switchWalletBorderBgColor);
    }
`

const SwitchWallet = () => {
    const conectWalletModalRef:any = useRef()
    const useWeb3ReactContext = useWeb3React<Web3Provider>()
    const { account, error, chainId } = useWeb3ReactContext
    const connectWalletClick = () => {
        console.log('connectWalletClick')
        conectWalletModalRef.current.updateData({visible: true})
    }

    return (
        <div>
            <SwitchWalletBox onClick={connectWalletClick}>
                {   !!error ?
                    <FormattedMessage id="header.unsupported.network" defaultMessage="" values={{name: ''}} />
                    :
                    account ?
                    `${account.substring(0, 8)}...${account.substring(account.length - 4)}`
                    :
                    <FormattedMessage id="header.connectwallet" defaultMessage="" values={{name: ''}} />
                }
            </SwitchWalletBox>
            
            <ConectWalletModal onRef={conectWalletModalRef} />
        </div>
        
    )
}
export default SwitchWallet
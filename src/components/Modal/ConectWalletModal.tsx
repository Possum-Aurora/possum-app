import styled from "styled-components"
import { Modal } from "antd"
import { useImperativeHandle, useState, useEffect } from "react"
import { SUPPORTED_WALLETS } from "constants/wallet"
import { connectorsByName } from 'connectors/NetworkConnector'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { FormattedMessage } from 'react-intl'
import { useEagerConnect, useInactiveListener } from 'hooks/triedEager'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from '@web3-react/injected-connector'

const ConectWalletModalBox = styled.div`
    box-sizing: border-box;
`

const WalletItem = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #CED0F7;
    margin-bottom: 20px;
    border-radius: 5px;
    background: #EDEEF2;
    &:hover {
        border: 1px solid red;
    }
    img {
        height: 30px;
    }
    .item {
        cursor: pointer;
        flex: 1;
        padding: 20px;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .disabled {
        cursor: not-allowed;
        opacity: .6;
    }
    .disconnect {
        justify-content: center;
        background: red;
        color: #fff;
    }
`

const ItemName = styled.div`
    color: #000000;
    font-size: 16px;
    font-weight: 500;
`

const ConectWalletModal = (props:any) => {
    const { connector, activate, deactivate, active, error } = useWeb3React()
    const ethereum = (window as any).ethereum
    const [visible, setVisible] = useState(props.visible)
    const [walletOprions, setWalletOprions] = useState<any[]>([])
    const [activatingConnector, setActivatingConnector] = useState<any>()

    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect()
    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector)

    useEffect(() => {
        initData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useImperativeHandle(props.onRef, () => ({
        // onChild 就是暴露给父组件的方法
        updateData ({visible = false}) {
            console.log('onChild 就是暴露给父组件的方法')
            setVisible(visible)
        }
    }))

    const initData = () => {
        let options:Array<any> = []
        if (typeof ethereum !== 'undefined') {
            console.log('MetaMask is installed!')
            SUPPORTED_WALLETS.forEach((item: any) => {
                options.push(item)
            })
        } else {
            console.log('MetaMask not installed!')
            SUPPORTED_WALLETS.forEach((item: any) => {
                if (item.name === 'MetaMask') {
                    item.link = 'https://metamask.io/'
                    item.name = 'Install Metamask'
                }
                options.push(item)
            })
        }
        setWalletOprions(options)
    }

    const handleOk = () => {
        setVisible(false)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    const selectWalletItemClick = (item: any) => {
        let name:string = item.name
        const currentConnector = connectorsByName[name]
        setActivatingConnector(currentConnector)
        activate(currentConnector)
        setVisible(false)
    }

    const deactivateClick = () => {
        if (connector === connectorsByName['WalletConnect']) {
            (connector as any).close()
        } else if (connector === connectorsByName['Injected']) {
            deactivate()
            setVisible(false)
        }
    }

    const getErrorMessage = (error: Error) => {
        let errorMsg:string = ''
        if (error instanceof NoEthereumProviderError) {
            errorMsg = 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
        } else if (error instanceof UnsupportedChainIdError) {
            errorMsg = "You're connected to an unsupported network."
        } else if (
          error instanceof UserRejectedRequestErrorInjected ||
          error instanceof UserRejectedRequestErrorWalletConnect ||
          error instanceof UserRejectedRequestErrorFrame
        ) {
            errorMsg =  'Please authorize this website to access your Ethereum account.'
        } else {
          errorMsg =  'An unknown error occurred. Check the console for more details.'
        }
        return errorMsg
    }

    return (
        <Modal
            title="Select the wallet"
            visible={visible}
            onOk={handleOk} 
            onCancel={handleCancel}
            footer={null}
        >
            <ConectWalletModalBox>
                {
                    walletOprions.map((item:any, index:number) => {
                        item.disabled = false
                        if (connector === connectorsByName[item.name]) {
                            item.disabled = true || false
                        } 
                        return (
                            <WalletItem key={index}>
                                {

                                    item.link ?
                                    <a className="item" target="_blank" href={item.link} rel="noreferrer">
                                        <ItemName>{item.label}</ItemName>
                                        <img src={item.iconURL} alt="" />
                                    </a>
                                    :
                                    <button onClick={() => selectWalletItemClick(item)}
                                        className={`item ${item.disabled ? 'disabled' : ''}`}
                                        disabled={item.disabled}
                                    >
                                        <ItemName>{item.label}</ItemName>
                                        <img src={item.iconURL} alt="" />
                                    </button>
                                }
                            </WalletItem>
                        )
                    })
                }
                {
                    active ?
                    <WalletItem>
                        <div className="item disconnect" onClick={() => deactivateClick()}>
                            <FormattedMessage id="connectmodel.disconnect" defaultMessage="" values={{name: ''}} />
                        </div>
                    </WalletItem>
                    :
                    ''
                }
                {!!error && <h4 style={{ marginTop: '1rem', marginBottom: '0' }}>{getErrorMessage(error)}</h4>}
            </ConectWalletModalBox>
        </Modal>
    )
}
export default ConectWalletModal
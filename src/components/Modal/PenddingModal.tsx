import styled from 'styled-components'
import { useState, useImperativeHandle, useEffect } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useAppSelector } from 'state/hooks'
import loaddingBg from 'assets/images/loaddingBg.png'
import ldBg from 'assets/images/ldBg.png'
import success from 'assets/images/success.png'
import failBg from 'assets/images/failBg.png'
import { useOpenModal } from 'state/block/hooks'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getBlockExplorer } from 'constants/tokens'

const ConfirmModalBox = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(25, 27, 31, 0.8);
    z-index: 9999999;
`

const ConfirmModalContent = styled.div`
    position: relative;
    width: 440px;
    padding: 40px 0 80px 0;
    margin: auto;
    background: #40444F;
    border-radius: 30px;
    margin-top: 150px;
    .loaddingBg {
        position: absolute;
        bottom: 0;
        width: 100%;
    }
    .ldBg {
        position: absolute;
        bottom: 0;
        width: 100%;
    }
`

const ConfirmModalHeader = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);/*相对于自己的百分比*/
    display: flex;
    align-items: center;
    justify-content: center;
    width: 330px;
    height: 55px;
    background: #2C2F36;
    box-shadow: 4px 6px 11px 0px rgba(0, 0, 0, 0.5);
    border-radius: 40px;
    text-align: center;
    font-size: 20px;
    font-family: DINPro-Medium, DINPro;
    font-weight: 500;
    color: #FFFFFF;
    .active {
        background: #40444F;
        border-radius: 27px;
        padding: 12px 0;
        font-size: 16px;
        font-family: DINPro-Bold, DINPro;
        font-weight: bold;
        color: #2172E5;
    }
`

const ConfirmModalHeaderItem = styled.div`
    cursor: pointer;
    width: 300px;
    text-align: center;
    font-size: 16px;
    font-family: DINPro-Medium, DINPro;
    font-weight: 500;
    color: #FFFFFF;
    background: #40444F;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    &:hover {
        color: #2172E5;
    }
`

const ConfirmModalMain = styled.div`

`

const TokenInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`

const CancelIcon = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-bottom: 10px;
    padding-right: 20px;
    .anticon {
        font-size: 20px;
    }
    .anticon:hover {
        opacity: .7;
    }
`

const TokenImg = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: linear-gradient(180deg, #2C2F36 0%, #40444F 100%);
    img {
        width: 50px;
    }
`

const InfoContent = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 18px;
    font-family: DINPro-Medium, DINPro;
    font-weight: 500;
    color: #FFFFFF;
    letter-spacing: 5px;
`

const TipContent = styled.div`
    display: inline-block;
    text-align: center;
    padding: 0 60px;
    font-size: 18px;
    font-family: DINPro-Medium, DINPro;
    font-weight: 500;
    color: #FFFFFF;
`

const PenddingModal = (props: any) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [tradeStatus, setTradeStatus] = useState(5)
    const [viewblockUrl, setViewBlockUrl] = useState('')
    const openModal: boolean = useAppSelector((state) => state.application.openModal)
    const hash:string = useAppSelector((state) => state.application.hash)
    const openModalStatus = useOpenModal()
    const { chainId } = useActiveWeb3React()

    useEffect(() => {
        if (!openModal && hash) {
            setContent('Successful')
            setTradeStatus(1)
            openModalStatus()
            setViewBlockUrl(getBlockExplorer(chainId, hash))
        }
    }, [!openModal, hash])

    useImperativeHandle(props.onRef, () => ({
        // onChild 就是暴露给父组件的方法
        updateData ({
            visible = false,
            content = '',
            tradeStatus = 2,
            title = '',
        }) {
            setIsModalVisible(visible)
            setContent(content)
            setTradeStatus(tradeStatus)
            setTitle(title)
        }
    }))

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    return (
        <ConfirmModalBox
            style={isModalVisible ? { display: 'block' } : { display: 'none' }}
        >
            <ConfirmModalContent>
                <ConfirmModalHeader>
                    <ConfirmModalHeaderItem>{title}</ConfirmModalHeaderItem>
                </ConfirmModalHeader>

                <ConfirmModalMain>
                    <CancelIcon>
                        <CloseOutlined onClick={handleCancel} />
                    </CancelIcon>

                    <TokenInfo>
                        <TokenImg>
                            {
                                tradeStatus === 0 ?
                                    <img alt='' src={failBg} />
                                :
                                    ''
                            }
                            {
                                tradeStatus === 1 ?
                                    <img alt='' src={success} />
                                :
                                    ''
                            }
                            {
                                tradeStatus === 2 ?
                                    <Spin />
                                :
                                    ''
                            }
                            
                        </TokenImg>

                        <InfoContent>{content}</InfoContent>

                        {
                            tradeStatus === 0 ?
                                <TipContent>
                                    Sorry, your deposit is unsuccessful 
                                    due to unexpected reasons. 
                                    Please try again!
                                </TipContent>
                            :
                                ''
                        }

                        {
                            // https://explorer.testnet.aurora.dev/tx/0xc13f28327442f954c8face49db8a8811bdd5a5eee30ae6b9ddea82e65efed37c/token-transfers
                            tradeStatus === 1 ?
                                <TipContent>
                                    Awesome, you action has completed, view on 
                                    <a target='_blank' rel='noreferrer' href={viewblockUrl}> block explorer</a>
                                </TipContent>
                            :
                                ''
                        }
                       
                    </TokenInfo>
                </ConfirmModalMain>

                <img className='loaddingBg' alt='' src={loaddingBg} />
                <img className='ldBg' alt='' src={ldBg} />
            </ConfirmModalContent>
        </ConfirmModalBox>
    )
}

export default PenddingModal
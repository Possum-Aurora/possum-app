import styled from 'styled-components'
import { useState, useImperativeHandle } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Tooltip, Statistic } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import Buttom from 'components/Button'
import { usePossumSingerContract, useClaimApproveContract } from 'hooks/useContract'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { redeemTrancheToken, approve } from 'hooks/useContractMethods'
import { getPossumAddress } from 'utils/addressHelpers'
import { TransactionResponse } from '@ethersproject/providers'
import { useTransactionAdder } from 'state/transactions/hooks'

const ConfirmModalBox = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(25, 27, 31, 0.8);
    z-index: 9999;
`

const ConfirmModalContent = styled.div`
    position: relative;
    width: 480px;
    padding: 40px;
    margin: auto;
    background: #40444F;
    border-radius: 30px;
    margin-top: 150px;
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
    height: 65px;
    background: #2C2F36;
    box-shadow: 4px 6px 11px 0px rgba(0, 0, 0, 0.5);
    border-radius: 40px;
    padding: 0 15px;
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
    width: 100%;
    text-align: center;
    font-size: 16px;
    font-family: DINPro-Medium, DINPro;
    font-weight: 500;
    color: #FFFFFF;
    &:hover {
        color: #2172E5;
    }
`

const ConfirmModalMain = styled.div`

`

const TokenInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
`

const CancelIcon = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-bottom: 10px;
    .anticon {
        font-size: 20px;
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
    .name {
        font-size: 30px;
        font-family: DINPro-Bold, DINPro;
        font-weight: bold;
        color: #FFFFFF;
    }
    .sortName {
        font-size: 18px;
        font-family: DINPro-Medium, DINPro;
        font-weight: 500;
        color: #FFFFFF;
    }
`

const TokenBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    .balance {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        font-size: 16px;
        font-family: DINPro;
        color: var(--whiteColor);
        height: 35px;
        line-height: 45px;
        .ant-statistic {
            .ant-statistic-content {
                .ant-statistic-content-prefix {
                    font-size: 24px;
                    font-family: DINPro;
                    color: var(--whiteColor);
                }
                .ant-statistic-content-suffix {
                    font-size: 15px;
                    font-family: DINPro;
                    color: var(--whiteColor);
                }
                .ant-statistic-content-value {
                    .ant-statistic-content-value-decimal,
                    .ant-statistic-content-value-int {
                        font-size: 28px;
                        font-family: DINPro;
                        color: var(--whiteColor);
                    }
                }
            } 
        }
    }
`

const InputBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    line-height: 50px;
    background: #2C2F36;
    border-radius: 8px;
    margin-top: 10px;
    padding: 0 15px;
    .ant-input-number {
        background: #2C2F36;
        border: none;
        width: 300px;
        font-size: 20px;
        font-family: DINPro-Medium, DINPro;
        font-weight: 500;
        color: #FFFFFF;
    }
`

const RightBox = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    font-family: DINPro-Medium, DINPro;
    font-weight: 500;
    color: #FFFFFF;
    img {
        width: 40px;
    }
`

const ButtomBox = styled.div`
    cursor: pointer;
    margin-top: 30px;
`

const LineBox = styled.div`
    margin-top: 20px;
`

const LineContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    .label {
        font-size: 16px;
        font-family: DINPro;
        color: #FFFFFF;
    }
    .val {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-family: DINPro;
        color: #FFFFFF;
        .ant-statistic {
            .ant-statistic-content {
                .ant-statistic-content-prefix {
                    font-size: 16px;
                    font-family: DINPro;
                    color: var(--whiteColor);
                }
                .ant-statistic-content-suffix {
                    font-size: 16px;
                    font-family: DINPro;
                    color: var(--whiteColor);
                }
                .ant-statistic-content-value {
                    .ant-statistic-content-value-decimal,
                    .ant-statistic-content-value-int {
                        font-size: 16px;
                        font-family: DINPro;
                        color: var(--whiteColor);
                    }
                }
            } 
        }
    }
`

const ClaimModal = (props: any) => {
    const { chainId, account } = useActiveWeb3React()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [currentType, setCurrentType] = useState('')
    const [logoUrl, setLogoUrl] = useState('')
    const [name, setName] = useState('')
    const [productTitle, setProductTitle] = useState('')
    const [productEpoch, setProductEpoch] = useState('')
    const [pid, setPid] = useState(0)
    const [claimATokenAmount, setClaimATokenAmount] = useState(0)
    const [claimBTokenAmount, setClaimBTokenAmount] = useState(0)
    const [totalClaimAmount, setTotalClaimAmount] = useState(0)
    const [aTokenApy, setATokenApy] = useState(0)
    const [bTokenApy, setBTokenApy] = useState(0)
    const [aTokenAddress, setaTokenAddress] = useState('')
    const [bTokenAddress, setbTokenAddress] = useState('')

    // monitor call to help UI loading state
    const addTransaction = useTransactionAdder()
    const possumContract = usePossumSingerContract()
    const aTokenApproveContract = useClaimApproveContract(aTokenAddress)
    const bTokenApproveContract = useClaimApproveContract(bTokenAddress)
    
    useImperativeHandle(props.onRef, () => ({
        // onChild 就是暴露给父组件的方法
        updateData ({
            visible = false,
            logoUrl = '',
            name = '',
            productTitle = '',
            productEpoch = '',
            type = '',
            pid = 0,
            lockPeriod = 0,
            aTokenBalance = 0,
            bTokenBalance = 0,
            aTokenPrice = 0,
            bTokenPrice = 0,
            aTokenAddress = '',
            bTokenAddress = ''
        }) {
            console.log(`aTokenAddress==${aTokenAddress}, bTokenAddress==${bTokenAddress}`)
            console.log(`aTokenBalance==${aTokenBalance}, aTokenPrice==${aTokenPrice}, lockPeriod==${lockPeriod}`)
            console.log(`bTokenBalance==${bTokenBalance}, bTokenPrice==${bTokenPrice}, lockPeriod==${lockPeriod}`)
            setaTokenAddress(aTokenAddress)
            setbTokenAddress(bTokenAddress)
            setProductTitle(productTitle)
            setProductEpoch(productEpoch)
            setIsModalVisible(visible)
            setLogoUrl(logoUrl)
            setName(name)
            setCurrentType(type)
            setPid(pid)
            countATokenClaimAmount(aTokenPrice, aTokenBalance, lockPeriod)
            countBTokenClaimAmount(bTokenPrice, bTokenBalance, lockPeriod)
            countTotalClaim()
        }
    }))

    const countATokenClaimAmount = (tokenPrice: number, useBalance: number, lockPeriod: number) => {
        let yearSec = 24 * 3600 * 365
        let price = tokenPrice - 1
        let amount = price * (lockPeriod / yearSec) * useBalance
        let apy = price * (lockPeriod / yearSec) * 100
        setATokenApy(apy)
        setClaimATokenAmount(amount + useBalance)
    }

    const countBTokenClaimAmount = (tokenPrice: number, useBalance: number, lockPeriod: number) => {
        let yearSec = 24 * 3600 * 365
        let price = tokenPrice - 1
        let apy = price * (lockPeriod / yearSec) * 100
        let amount = price * (lockPeriod / yearSec) * useBalance
        setBTokenApy(apy)
        setClaimBTokenAmount(amount + useBalance)
    }

    const countTotalClaim = () => {
        console.log('claimATokenAmount==', claimATokenAmount )
        console.log('claimBTokenAmount==', claimBTokenAmount)
        let totalAmount = parseFloat(claimATokenAmount.toFixed(4)) + parseFloat(claimBTokenAmount.toFixed(4))
        setTotalClaimAmount(totalAmount)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const onButtonConfirmClick = () => {
        // switch (currentType) {
        //     case 'VariantClaim':
        //         variantClaimHander()
        //         break

        //     case 'FixClaim':
        //         FixClaimHander()
        //         break
            
        //     default:
        //         break
        // }
        claimHander()
        setIsModalVisible(false)
    }

    const claimHander = async () => {
        if (chainId) {
            props.updateStatus(2)
            let aPoolReceipt: any = await approve(aTokenApproveContract, getPossumAddress(chainId), 1000)
            if (aPoolReceipt?.status) {
                let bPoolreceipt: any = await approve(bTokenApproveContract, getPossumAddress(chainId), 1000)
                if (bPoolreceipt?.status) {
                    let result: TransactionResponse | '' = await redeemTrancheToken(possumContract, pid)
                    if (result) {
                        addTransaction(result, {
                            summary: 'Claim',
                            claim: { recipient: account ? account : ''}
                        })
                    } else {
                        props.updateStatus(0)
                    }
                }
            } else {
                props.updateStatus(0)
            }
        } else {
            props.updateStatus(0)
        }
    }

    // const variantClaimHander = async () => {
    //     if (chainId) {
    //         props.updateStatus(2)
    //         let receipt: any = await approve(possumApproveContract, getPossumAddress(chainId), 1000)
    //         if (receipt?.status) {
    //             let result: TransactionResponse | '' = await redeemTrancheToken(possumContract, pid)
    //             if (result) {
    //                 addTransaction(result, {
    //                     summary: 'Claim',
    //                     claim: { recipient: account ? account : ''}
    //                 })
    //             } else {
    //                 props.updateStatus(0)
    //             }
    //         } else {
    //             props.updateStatus(0)
    //         }
    //     }
    // }

    // const FixClaimHander = async () => {
    //     if (chainId) {
    //         props.updateStatus(2)
    //         let receipt: any = await approve(possumApproveContract, getPossumAddress(chainId), 1000)
    //         if (receipt?.status) {
    //             let result: TransactionResponse | '' = await redeemTrancheToken(possumContract, pid)
    //             if (result) {
    //                 addTransaction(result, {
    //                     summary: 'Claim ',
    //                     claim: { recipient: account ? account : ''}
    //                 })
    //             } else {
    //                 props.updateStatus(0)
    //             }
    //         } else {
    //             props.updateStatus(0)
    //         }
    //     }
    // }

    return (
        <ConfirmModalBox
            style={isModalVisible ? { display: 'block' } : { display: 'none' }}
        >
            <ConfirmModalContent>
                <ConfirmModalHeader>
                    <ConfirmModalHeaderItem className='active'>
                        Claim All
                    </ConfirmModalHeaderItem>
                </ConfirmModalHeader>

                <ConfirmModalMain>
                    <CancelIcon>
                        <CloseOutlined onClick={handleCancel} />
                    </CancelIcon>

                    <TokenInfo>
                        <TokenImg>
                            <img alt='' src={logoUrl} />
                        </TokenImg>

                        <InfoContent>
                            <div className='name'>
                                {productTitle}
                                <Tooltip placement="topLeft" title="efewrqwerweq">
                                    <QuestionCircleOutlined />
                                </Tooltip>
                            </div>
                            <div className='sortName'>{productEpoch}</div>
                        </InfoContent>
                    </TokenInfo>

                    <TokenBox>
                        <div className='balance'>
                            <Statistic value={totalClaimAmount} precision={2} suffix={name} prefix="Claimable: " />
                        </div>
                    </TokenBox>

                    <LineBox>
                        <LineContent>
                            <div className='label'>Fixed Pool Claimable</div>

                            <div className='val'>
                                <Statistic value={claimATokenAmount} precision={4} suffix=" USDT" />
                            </div>
                        </LineContent>

                        <LineContent>
                            <div className='label'>Fixed Pool ROI</div>

                            <div className='val'>
                                <Statistic value={aTokenApy} precision={2} suffix="%" />
                            </div>
                        </LineContent>

                        <LineContent>
                            <div className='label'>Variable Pool Claimable</div>

                            <div className='val'>
                                <Statistic value={claimBTokenAmount} precision={4} suffix=" USDT" />
                            </div>
                        </LineContent>

                        <LineContent>
                            <div className='label'>Vairable Pool ROI</div>

                            <div className='val'>
                                <Statistic value={bTokenApy} precision={2} suffix="%" />
                            </div>
                        </LineContent>

                        {/* <LineContent>
                            <div className='label'>Platform Fee (0.3%)</div>

                            <div className='val'>
                                <Statistic value='622347' precision={2} suffix=" USDT" />
                            </div>
                        </LineContent> */}
                    </LineBox>

                    <ButtomBox>
                        <Buttom type='ConfirmDeposi' text='Confirm' onButClick={onButtonConfirmClick} />
                    </ButtomBox>
                </ConfirmModalMain>
            </ConfirmModalContent>
        </ConfirmModalBox>
    )
}

export default ClaimModal
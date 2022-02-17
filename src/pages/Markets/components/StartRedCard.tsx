import styled from "styled-components"
import RedBgImg from 'images/RedBgImg.png'
import { FormattedMessage } from 'react-intl'
import { Statistic, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import Button from 'components/Button'
import { useEffect, useRef, useState } from 'react'
import ConfirmModal from 'components/Modal/ConfirmModal'
import MoveProgress from 'components/Progress/MoveProgress'
import { timestampToTime } from 'utils/timer'
import ConectWalletModal from "components/Modal/ConectWalletModal"
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getBalanceByTokenAddress, getDepositedByAddress } from 'hooks/useContractMethods'
import { usePossumSingerContract, usePossumContract } from 'hooks/useContract'
import PenddingModal from 'components/Modal/PenddingModal'
import { useBlockNumber } from 'state/block/hooks'

const StartRedCardbox = styled.div`
    position: relative;
    background: url(${RedBgImg}) no-repeat;
    background-size: 100% 100%;
    width: 525px;
    height: 676px;
    .redCard {
        color: var(--redCardColor);
    }
    .ant-statistic {
        .ant-statistic-content {
            .ant-statistic-content-prefix {
                font-family: DINPro-Medium, DINPro;
                font-weight: 500;
                color: var(--whiteColor);
            }
            .ant-statistic-content-suffix {
                font-family: DINPro-Medium, DINPro;
                font-weight: 500;
                color: var(--whiteColor);
            }
            .ant-statistic-content-value {
                .ant-statistic-content-value-decimal,
                .ant-statistic-content-value-int {
                    font-family: DINPro-Medium, DINPro;
                    font-weight: 500;
                    color: var(--whiteColor);
                }
            }
        } 
    }
`

const CardTitle = styled.div`
    position: absolute;
    font-size: 30px;
    font-family: DINPro-Bold, DINPro;
    font-weight: bold;
    left: 50%;
    top: 55px;
    transform: translate(-50%, -50%);/*相对于自己的百分比*/
`

const StartReadCardContent = styled.div`
    box-sizing: border-box;
    padding: 20px 70px;
    margin-top: 100px;
`

const ApyContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    .tip {
        font-size: 16px;
        font-family: DINPro;
        color: #979FB5;
    }
`

const CardInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 320px;
    margin: 0 auto;
    margin-top: 30px;
`

const InfoItem = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    line-height: 32px;
    .label {
        font-size: 18px;
        font-family: DINPro-Medium, DINPro;
        font-weight: 500;
        color: #979FB5;
        text-align: left;
        width: 170px;
    }
    .val {
        font-size: 16px;
        font-family: DINPro-Bold, DINPro;
        font-weight: bold;
        color: #FFFFFF;
    }
`

const ButtonBox = styled.div`
    width: 100%;
    margin: 30px 0;
`

const GridBox = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: repeat(2, 2fr);
    .borderActive {
        border-right: 1px solid #1F2127;
    }
    .borderB {
        border-bottom: 1px solid #1F2127;
    }
`

const GridItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    .val {
        font-size: 16px;
        font-family: DINPro-Bold, DINPro;
        font-weight: bold;
        line-height: 32px;
        color: #fff;
    }
    .label {
        font-size: 14px;
        font-family: DINPro;
        color: #979FB5;
    }
    .jk {
        display: flex;
        align-items: center;
        span {
            font-size: 16px;
            font-family: DINPro-Bold, DINPro;
            font-weight: bold;
            line-height: 32px;
            color: #fff;
        }
    }
`

const StartRedCard = (props: any) => {
    const { library, account, chainId } = useActiveWeb3React()
    const confirmModalRef:any = useRef()
    const conectWalletModalRef:any = useRef()
    const penddingModalRef: any = useRef()
    const type:string = 'Deposit & Withdraw'
    const [esitimatedApy, setEsitimatedApy] = useState(0)
    const [useBalance, setUseBalance] = useState(0)
    const tokenAddress = props.buyerCoinAddress || ''
    const possumContract = usePossumSingerContract()
    const useContract = usePossumContract()
    const latestBlockNumber = useBlockNumber()
    const [depositedBalance, setDepositedBalance] = useState(0)

    useEffect(() => {
        fetchBalance()
    }, [latestBlockNumber, library, account, chainId])
    
    const fetchBalance = async () => {
        const { balance } = await getBalanceByTokenAddress(possumContract, tokenAddress, account)
        setUseBalance(balance)
    }

    const onButClick = (type:string) => {
        console.log('props.pid==', props)
        if (type === 'noNetwork') {
            conectWalletModalRef.current.updateData({visible: true})
        } else {
            confirmModalRef.current.updateData({
                visible: true,
                logoUrl: props.logoUrl || '',
                productTitle: props.productTitle || '',
                productEpoch: props.productEpoch || '',
                symbolB: props.symbolB || '',
                name: props.name || '',
                pid: props.pid || 0,
                useBalance,
                tokenAddress,
                type: 'DepositVariable',
                symbolBDepositedBalance: props.symbolBDepositedBalance || 0,
                varibleTokenLimit: props.varibleTokenLimit
            })
        }
    }

    useEffect(() => {
        getVariableAmount()
        const timer = setInterval(() => {
            getVariableAmount()
          }, 3000)
          return () => {
            clearInterval(timer)
          }
    }, [])

    const getVariableAmount = async () => {
        let res:any = await getDepositedByAddress(useContract, props.bTrancheAddress)
        console.log('getVariableAmount==', res)
        setDepositedBalance(res.depositedBalance)
    }
    
    const updateEsitimatedApy = (apy: number) => {
        setEsitimatedApy(apy)
    }

    const updateStatus = (type: number) => {
        if (type === 0) {
            penddingModalRef.current.updateData({
                title: 'Deposit',
                visible: true,
                content: 'Deposit Fail',
                tradeStatus: 0 // 交易失败
            })
        } else if (type === 2) {
            penddingModalRef.current.updateData({
                title: 'Deposit',
                visible: true,
                content: 'Loading...',
                tradeStatus: 2 // 交易等待中
            })
        }
    }

    return (
        <StartRedCardbox>
            <CardTitle className="redCard">
                <FormattedMessage id='card.title.variant' defaultMessage="" values={{name: ''}} />
            </CardTitle>

            <StartReadCardContent>
                <ApyContent>
                    <Statistic value={esitimatedApy} precision={2} suffix="%" valueStyle={{ 'fontWeight': 'bold', 'fontSize': '40px' }} />
                    <div className="tip">Esitimated APY</div>
                </ApyContent>

                <MoveProgress updateEsitimatedApy={(apy: number) => updateEsitimatedApy(apy)} />

                <CardInfo>
                    <InfoItem>
                        <div className="label">Probability 
                            <Tooltip placement="topLeft" title='Probability of occurrence of variable pool APY predicted from past underlying protocol data'>
                                <QuestionCircleOutlined />
                            </Tooltip> :
                        </div>
                        <Statistic value='62.7' precision={2} suffix="%" valueStyle={{ 'fontWeight': 'bold', 'fontSize': '18px' }} />
                    </InfoItem>

                    <InfoItem>
                        <div className="label">Balance:</div>
                        <Statistic value={useBalance} precision={2} prefix="" suffix={props.name} valueStyle={{ 'fontWeight': 'bold', 'fontSize': '18px' }} />
                    </InfoItem>  
                </CardInfo>

                <ButtonBox>
                    {
                        !chainId || !account ? 
                            <Button text='Connect Wallet' type='noNetwork' onButClick={(type) => onButClick(type)} />
                        :
                            <Button text='Deposit' type={type} onButClick={(type) => onButClick(type)} />
                    }
                </ButtonBox>

                <GridBox>
                    <GridItem className="borderActive borderB">
                        <div className="val">-{props.RISK / 100}% to 100%</div>
                        <div className="label">
                            Potential APY
                            <Tooltip placement="topLeft" title='Acceptable range of varoable pool returns'>
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </div>
                    </GridItem>

                    <GridItem className="borderB">
                        <div className="val">{props.minVaribleToken / 100}% / {props.maxVaribleToken / 100}%</div>
                        <div className="label">
                            Min/Max Proportion
                            <Tooltip placement="topLeft" title='Maximum and minimum ratio of variable pool capital to total pool capital'>
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </div>
                    </GridItem>

                    <GridItem className="borderActive">
                        <div className="val">Ends in </div>
                        <div className="val">{timestampToTime(props.tranchBTimeout + props.trancheInitTime)}</div>
                    </GridItem>

                    <GridItem>
                        <div className="val">Goal</div>
                        <div className="jk">
                            <Statistic value={depositedBalance} precision={2} prefix="" suffix='' valueStyle={{ 'fontWeight': 'bold', 'fontSize': '16px' }} />
                            <span> / </span>
                            <Statistic value={props.varibleTokenLimit} precision={2} prefix="" suffix='' valueStyle={{ 'fontWeight': 'bold', 'fontSize': '16px' }} />
                        </div>
                    </GridItem>
                </GridBox>
            </StartReadCardContent>

            <ConfirmModal onRef={confirmModalRef} updateStatus={(type: number) => updateStatus(type)} />

            <ConectWalletModal onRef={conectWalletModalRef} />

            <PenddingModal onRef={penddingModalRef} />
        </StartRedCardbox>
    )
}

export default StartRedCard
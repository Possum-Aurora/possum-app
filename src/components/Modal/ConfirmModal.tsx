import styled from 'styled-components'
import { useState, useImperativeHandle } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Tooltip, Statistic, InputNumber } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import Buttom from 'components/Button'
import { buyTrancheBToken, approve, buyTrancheAToken } from 'hooks/useContractMethods'
import { usePossumSingerContract, usePossumApproveContract } from 'hooks/useContract'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getPossumAddress } from 'utils/addressHelpers'
import { useTransactionAdder } from 'state/transactions/hooks'
import { TransactionResponse } from '@ethersproject/providers'

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
        justify-content: flex-end;
        gap: 5px;
        font-size: 16px;
        font-family: DINPro;
        color: var(--whiteColor);
        height: 35px;
        line-height: 35px;
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
        margin-left: 10px;
        width: 30px;
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

const DisableBut = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 48px;
    border-radius: 8px;
    border: 1px solid var(--redCardColor);
    font-size: 16px;
    font-family: DINPro-Bold, DINPro;
    font-weight: bold;
    color: var(--redCardColor);
    opacity: .4;
`

const ConfirmModal = (props: any) => {
    const { chainId } = useActiveWeb3React()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [currentType, setCurrentType] = useState('')
    const [logoUrl, setLogoUrl] = useState('')
    const [inputVal, setInputVal] = useState('')
    const [productTitle, setProductTitle] = useState('')
    const [productEpoch, setProductEpoch] = useState('')
    const [currentToken, setCurrentToken] = useState('')
    const [useBalance, setUseBalance] = useState(0)
    const [pid, setPid] = useState(0)
    const [name, setName] = useState('')
    const [poolLiquidity, setPoolLiquidity] = useState(0)
    const [estimatedIncome, setEstimatedIncome] = useState(0)
    const [maxDeposit, setMaxDeposit] = useState(0)
    const [fixedApy, setFixedApy] = useState(0)
    const [rateInfluenceApy, setRateInfluenceApy] = useState(0)
    const [riskVariable, setRiskVariable] = useState(0) // 需要从variable池子中拿多少到fixed池子中
    const [symbolAdBalance, setSymbolAdBalance] = useState(0)
    const [lockPeriod, setLockPeriod] = useState(0)

    // monitor call to help UI loading state
    const addTransaction = useTransactionAdder()

    const possumContract = usePossumSingerContract()
    const possumApproveContract = usePossumApproveContract(name)

    useImperativeHandle(props.onRef, () => ({
        // onChild 就是暴露给父组件的方法
        updateData ({
            visible = false,
            logoUrl = '',
            productTitle = '',
            productEpoch = '',
            symbolB = '',
            useBalance = 0,
            pid = 0,
            name = '',
            type = '',
            symbolBDepositedBalance = 0,
            symbolADepositedBalance = 0,
            lockPeriod = 0,
            fixedApy = 0,
            varibleTokenLimit = 0,
            minVaribleToken = 0,
            RISK = 0,
        }) {
            console.log(`symbolADepositedBalance===${symbolADepositedBalance}, symbolBDepositedBalance==${symbolBDepositedBalance}`)
            setInputVal('')
            setIsModalVisible(visible)
            setLogoUrl(logoUrl)
            setProductTitle(productTitle)
            setProductEpoch(productEpoch)
            setCurrentToken(symbolB)
            setUseBalance(useBalance)
            setPid(pid)
            setName(name)
            setCurrentType(type)
            setFixedApy(fixedApy)
            setRateInfluenceApy(0)
            console.log(`apy==${fixedApy}, lockPeriodTimer==${lockPeriod}, type===${type}`)
            if (type === 'DepositVariable') {
                setPoolLiquidity(symbolBDepositedBalance)
                setMaxDeposit(varibleTokenLimit - symbolBDepositedBalance)
            } else if (type === 'DepositFix') {
                setLockPeriod(lockPeriod)
                let rate = (1 - minVaribleToken / 10000) / (minVaribleToken / 10000)
                setPoolLiquidity(symbolADepositedBalance)
                setMaxDeposit(rate * symbolBDepositedBalance - symbolADepositedBalance)
                setRiskVariable(RISK / 10000 * symbolBDepositedBalance * 100)
                setSymbolAdBalance(symbolADepositedBalance)
            }
        }
    }))

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const onButtonConfirmClick = () => {
        console.log('currentType==', currentType)
        switch (currentType) {
            case 'DepositVariable':
                depositVariable()
                break

            case 'DepositFix':
                depositFix()
                break    

            case 'Withdraw':
                break
            
            default:
                break
        }
        setIsModalVisible(false)
    }

    const depositVariable = async () => {
        if (chainId && inputVal) {
            props.updateStatus(2)
            console.log('353245435===', inputVal)
            let receipt: any = await approve(possumApproveContract, getPossumAddress(chainId), inputVal)
            if (receipt?.status) {
                let result: TransactionResponse | '' = await buyTrancheBToken(possumContract, pid, inputVal)
                if (result) {
                    addTransaction(result, {
                        summary: 'deposite ',
                        approval: { tokenAddress: getPossumAddress(chainId), spender: ''}
                    })
                } else {
                    props.updateStatus(0)
                }
            } else {
                props.updateStatus(0)
            }
        }
    }

    const depositFix = async () => {
        if (chainId && inputVal) {
            props.updateStatus(2)
            let receipt: any = await approve(possumApproveContract, getPossumAddress(chainId), inputVal)
            if (receipt?.status) {
                let result: TransactionResponse | '' = await buyTrancheAToken(possumContract, pid, inputVal)
                if (result) {
                    addTransaction(result, {
                        summary: 'deposite ',
                        approval: { tokenAddress: getPossumAddress(chainId), spender: ''}
                    })
                } else {
                    props.updateStatus(0)
                }
            } else {
                props.updateStatus(0)
            }
        }
    }

    const onChange = (value: string) => {
        console.log('maxDeposit==', maxDeposit)
        let inputVal = ''
        if (Number(value) > (maxDeposit)) {
            inputVal = maxDeposit + ''
        } else if (value) {
            inputVal = value
        }
        setInputVal(inputVal)
        if (currentType === 'DepositFix' && inputVal) {
            console.log('riskVariable==', riskVariable)
            let apy = riskVariable / (Number(inputVal) + symbolAdBalance)
            setRateInfluenceApy(apy)
            let yearTimer = 365 * 24 * 3600
            setEstimatedIncome(apy * (lockPeriod / yearTimer))
        } else {
            setRateInfluenceApy(0)
        }
    }

    return (
        <ConfirmModalBox
            style={isModalVisible ? { display: 'block' } : { display: 'none' }}
        >
            <ConfirmModalContent>
                <ConfirmModalHeader>
                    <ConfirmModalHeaderItem className={currentType === 'Deposit' ? 'active' : ''}>
                        Deposit
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
                        <div className='balance'><Statistic value={useBalance} precision={2} suffix="" prefix="Balance: " /></div>

                        <InputBox>
                            <InputNumber autoFocus={true} value={inputVal} onChange={onChange} />
                            
                            <RightBox>
                                {name} <img alt='' src={logoUrl} />
                            </RightBox>
                        </InputBox>
                    </TokenBox>

                    <LineBox>
                        <LineContent>
                            <div className='label'>Current pool liquidity</div>

                            <div className='val'>
                                <Statistic value={poolLiquidity} precision={2} suffix={currentToken} />
                            </div>
                        </LineContent>

                        <LineContent>
                            <div className='label'>xToken receive</div>

                            <div className='val'>
                                <Statistic value={inputVal} precision={2} suffix={currentToken} />
                            </div>
                        </LineContent>

                        {
                            currentType === 'DepositFix' ?
                                <LineContent>
                                    <div className='label'>Estimated Income</div>

                                    <div className='val'>
                                        <Statistic value={inputVal ? estimatedIncome * parseFloat(inputVal) : 0} precision={2} suffix={currentToken} />
                                    </div>
                                </LineContent>
                            :
                                ''
                        }

                        <LineContent>
                            <div className='label'>Max Deposit</div>

                            <div className='val'>
                                <Statistic value={maxDeposit} precision={2} suffix={currentToken} />
                            </div>
                        </LineContent>

                        {
                            currentType === 'DepositFix' ?
                                <LineContent>
                                    <div className='label'>Fix Apy influence</div>

                                    <div className='val'>
                                        <Statistic value={fixedApy} precision={2} suffix='%' />
                                        -
                                        <Statistic value={rateInfluenceApy} precision={2} suffix='%' />
                                    </div>
                                </LineContent>
                            :
                                ''
                        }
                    </LineBox>

                    <ButtomBox>
                        {
                            !inputVal || Number(inputVal) < 0 || Number(inputVal) > useBalance ?
                                <DisableBut>Confirm</DisableBut>
                            :
                                <Buttom type='ConfirmDeposi' text='Confirm' onButClick={onButtonConfirmClick} />
                        }
                    </ButtomBox>
                </ConfirmModalMain>
            </ConfirmModalContent>
        </ConfirmModalBox>
    )
}

export default ConfirmModal
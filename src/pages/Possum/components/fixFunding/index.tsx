import styled from "styled-components"
import { FormattedMessage } from 'react-intl'
import SelectToken from './SelectToken'
import { Statistic } from 'antd'
import { useState, useEffect } from 'react'
import { useAppSelector } from 'state/hooks'
import { PoolData } from "state/types"
import { Skeleton } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { Token } from 'state/types'
// import { useFixedApy } from 'hooks/useFixedApy'

const FixFundingBox = styled.div`
    position: relative;
    margin-top: 160px;
`

const FixFundingConten = styled.div`
    position: relative;
    width: 524px;
    height: 550px;
    background: var(--fixFundingBgColor);
    border-radius: 30px;
    border: 1px solid var(--itemContentBorderColor);
`

const FixFundingHeader = styled.div`
    position: absolute;
    top: -40px;
    left: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 330px;
    height: 82px;
    background: var(--fixFundingHeaderBgColor);
    box-shadow: 0px 2px 18px 1px rgba(175, 175, 175, 0.5);
    border-radius: 40px;
    .headerContent {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 299px;
        height: 60px;
        line-height: 60px;
        background: var(--whiteColor);
        font-size: 30px;
        font-family: DINPro-Bold, DINPro;
        font-weight: bold;
        color: #1F2127;
        border-radius: 30px;
    }
`

const FundingContent = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;
    .img {
        border: 10px solid #EDEDED;
        width: 100px;
        border-radius: 50%;
    }
`

const ImgBox = styled.div`
    background: #EDEDED;
    border-radius: 50%;
    width: 100px;
    height: 100px;
`

const TokenInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 385px;
    margin-top: 30px;
    padding: 0 20px;
    .title {
        font-size: 16px;
        font-family: DINPro;
        color: var(--itemContentLabelColor);
        margin-bottom: 10px;
    }
    .ant-statistic {
        .ant-statistic-content {
            .ant-statistic-content-prefix {
                font-size: 36px;
                font-family: DINPro-Black, DINPro;
                font-weight: bold;
                color: var(--fixedRateColor);
            }
            .ant-statistic-content-suffix {
                font-size: 36px;
                font-family: DINPro-Black, DINPro;
                font-weight: bold;
                color: var(--fixedRateColor);
            }
            .ant-statistic-content-value {
                .ant-statistic-content-value-decimal,
                .ant-statistic-content-value-int {
                    font-size: 36px;
                    font-family: DINPro-Black, DINPro;
                    font-weight: bold;
                    color: var(--fixedRateColor);
                }
            }
        } 
    }
`

const InfoLine = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 10px;
    .lable {
        font-size: 18px;
        font-family: DINPro;
        color: #191B1F;
    }
    .val {
        font-size: 24px;
        font-family: DINPro-Black, DINPro;
        font-weight: bold;
        color: var(--fixedRateColor);
    }
    .ant-statistic {
        .ant-statistic-content {
            .ant-statistic-content-prefix {
                font-size: 24px;
                font-family: DINPro-Black, DINPro;
                font-weight: bold;
                color: var(--fixedRateColor);
            }
            .ant-statistic-content-suffix {
                font-size: 24px;
                font-family: DINPro-Black, DINPro;
                font-weight: bold;
                color: var(--fixedRateColor);
            }
            .ant-statistic-content-value {
                .ant-statistic-content-value-decimal,
                .ant-statistic-content-value-int {
                    font-size: 24px;
                    font-family: DINPro-Black, DINPro;
                    font-weight: bold;
                    color: var(--fixedRateColor);
                }
            }
        } 
    }

    .ant-skeleton {
        width: 200px;
    }

    .ant-skeleton-content{
        display: flex;
        justify-content: flex-end;
    }

    .ant-skeleton-content .ant-skeleton-title + .ant-skeleton-paragraph {
        display: none;
    }
`

const StepPage = styled.div`
    display: flex;
    justify-content: end;
    margin-top: 40px;
    padding-right: 30px;
    .stepIcon {
        cursor: pointer;
        width: 30px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        background: #1B88FF;
        border-radius: 6px;
        .anticon {
            color: #fff;
        }
    }
    .stepIcon:hover{
        opacity: .7;
    }
`

const FixFunding = () => {
    let navigate = useNavigate()
    const [currentTokenLogo, setCurrentLogo] = useState('')
    const [fixedApy, setFixedApy] = useState(0)
    const [fixedDeposited, setFixedDeposited] = useState(0)
    const [variableDeposited, setVariableDeposited] = useState(0)
    const [earningsPoolList, setEarningsPoolList] = useState<any[]>([])
    const [currentFundingType, setCurrentFundingType] = useState('Variable')
    const [tokenItem, setTokenItem] = useState<Token>()

    // useFixedApy(2)

    const list: PoolData[] = useAppSelector((state) => state.pool.poolList)
    const isLoadComplete = useAppSelector((state) => state.pool.isLoadSuccess)
    useEffect(() => {
        const filterToken = () => {
            const assetsList = list.filter((item: any) => {
                return !(item.fixedStatus === 'Closed' && item.variableStatus === 'Closed')
            })
            if (assetsList.length) {
                let poolData: any = assetsList[0]
                setCurrentLogo(poolData.logoUrl)
                if (poolData.trancheInitTime) {
                    getFixedApyByAddress(poolData)
                }
                console.log('assetsList==', assetsList)
                setEarningsPoolList(assetsList)
            }
        }
        if (list && list.length) {
            filterToken()
        }
    }, [list])

    async function getFixedApyByAddress (item: PoolData) {
        setFixedApy(item.fixedApy)
        if (item.variableStatus === 'Funding') {
            setCurrentFundingType('Variable')
        } else if (item.fixedStatus === 'Funding') {
            setCurrentFundingType('Fixed')
        }
        setVariableDeposited(item.symbolBDepositedBalance)
        setFixedDeposited(item.symbolADepositedBalance)
        setTokenItem(item)
    }

    const selectTokenClick = (item: PoolData) => {
        setCurrentLogo(item.logoUrl)
        getFixedApyByAddress(item)
    }

    const stepClick = () => {
        let type: string = ''
        if (currentFundingType === 'Variable') {
            type = 'variable'
        } else if (currentFundingType === 'Fixed') {
            type = 'fix'
        }
        navigate('/detail', {state: {
            token: tokenItem,
            type
        }, replace: true})
    }

    return (
        <FixFundingBox>
            <FixFundingConten>
                <FixFundingHeader>
                    <div className="headerContent">
                        {currentFundingType} Funding
                    </div>
                </FixFundingHeader>

                <StepPage>
                    <div className="stepIcon">
                        <RightOutlined onClick={stepClick} />
                    </div>
                </StepPage>

                <FundingContent>
                    <ImgBox>
                        <img className="img" alt="" src={currentTokenLogo} />
                    </ImgBox>
                    
                    <SelectToken
                        earningsPoolList={earningsPoolList}
                        selectTokenClick={selectTokenClick}
                        isLoadComplete={isLoadComplete}
                    />

                    <TokenInfo>
                        <InfoLine>
                            <div className="label">
                                <FormattedMessage id='markets.funding' defaultMessage="" values={{name: ''}} />
                            </div>
                            {
                                isLoadComplete ?
                                    <div className="val">{currentFundingType}</div>
                                :
                                    <Skeleton active paragraph={{ rows: 0 }} />
                            }
                        </InfoLine>

                        <InfoLine>
                            <div className="label"> {currentFundingType} APY
                                {/* <FormattedMessage id='fixed.apy' defaultMessage="" values={{name: ''}} /> */}
                            </div>
                            {
                                fixedApy ? 
                                    <Statistic value={ fixedApy } precision={2} suffix='%' />
                                :
                                    <div className="val">N/A</div>
                            }
                        </InfoLine>

                        {
                            currentFundingType === 'Fixed' ?
                            <InfoLine>
                                <div className="label">
                                    {currentFundingType} Deposited
                                </div>
                                {
                                    isLoadComplete ?
                                        <Statistic value={ fixedDeposited } precision={2} prefix='' />
                                    :
                                        <Skeleton active paragraph={{ rows: 0 }} />
                                }
                            </InfoLine>
                            :
                            ''
                        }

                        {
                            currentFundingType === 'Variable' ?
                            <InfoLine>
                                <div className="label">
                                    {currentFundingType} Deposited
                                </div>
                                {
                                    isLoadComplete ?
                                        <Statistic value={ variableDeposited } precision={2} prefix='' />
                                    :
                                        <Skeleton active paragraph={{ rows: 0 }} />
                                }
                            </InfoLine>
                            :
                            ''
                        }
                    </TokenInfo>
                </FundingContent>
            </FixFundingConten>
        </FixFundingBox>
    )
}

export default FixFunding
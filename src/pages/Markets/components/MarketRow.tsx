import styled from "styled-components"
import { FormattedMessage } from 'react-intl'
import { Statistic } from 'antd'
import Button from 'components/Button'
import { useNavigate } from 'react-router-dom'
import { Token } from 'state/types'

const MarketRowBox = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 246px;
    background: var(--headerBg);
    border-radius: 8px;
    margin-top: 20px;
    padding: 20px;
`

const LeftBox = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    img {
        width: 60px;
        border: 10px;
        border-radius: 50%;
        background: linear-gradient(360deg, #272931 0%, #111317 100%);
    }
`

const LeftName = styled.div`
    font-size: 18px;
    font-family: DINPro-Medium, DINPro;
    font-weight: 500;
    color: var(--whiteColor);
    margin-top: 10px;
`

const LeftSortName = styled.div`
    font-size: 14px;
    font-family: DINPro;
    color: var(--whiteColor);
`

const RightBox = styled.div`
    flex: 5;
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 15px;
`

const RightItem = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    background: var(--fixedRateColor);
    border-radius: 8px;
    .active {
        color: var(--butBorderColor);
    }
    .va {
        color: var(--redCardColor);
    }
`

const RightItemColumn = styled.div`
    flex: 1;
    text-align: center;
    font-size: 18px;
    font-family: DINPro-Medium, DINPro;
    font-weight: 500;
    color: var(--whiteColor);
    display: flex;
    justify-content: center;
    .ant-statistic {
        .ant-statistic-content {
            .ant-statistic-content-prefix {
                font-size: 18px;
                font-family: DINPro-Medium, DINPro;
                font-weight: 500;
                color: var(--whiteColor);
            }
            .ant-statistic-content-suffix {
                font-size: 18px;
                font-family: DINPro-Medium, DINPro;
                font-weight: 500;
                color: var(--whiteColor);
            }
            .ant-statistic-content-value {
                .ant-statistic-content-value-decimal,
                .ant-statistic-content-value-int {
                    font-size: 18px;
                    font-family: DINPro-Medium, DINPro;
                    font-weight: 500;
                    color: var(--whiteColor);
                }
            }
        } 
    }
`

const DisButton = styled.div`
    cursor: not-allowed;
    opacity: .5;
    width: 109px;
    display: flex;
    justify-content: center;
    text-align: center;
    height: 38px;
    line-height: 38px;
    border-radius: 8px;
    border: 1px solid var(--butBorderColor);
    font-size: 14px;
    font-family: DINPro-Medium,DINPro;
    font-weight: 500;
    color: var(--switchWalletBorderBgColor);
`

const DisRedButton = styled.div`
    cursor: not-allowed;
    opacity: .5;
    width: 109px;
    display: flex;
    justify-content: center;
    text-align: center;
    height: 38px;
    line-height: 38px;
    border-radius: 8px;
    font-size: 14px;
    font-family: DINPro-Medium,DINPro;
    font-weight: 500;
    color: var(--redCardColor);
    border: 1px solid var(--redCardColor);
`

const MarketRow = (token: Token) => {
    let navigate = useNavigate()
    const onButClick = (type: string) => {
        let tradeAddress: string = ''
        switch (type) {
            case 'fix':
                tradeAddress = token.aTrancheAddress
                break

            case 'variable':
                tradeAddress = token.bTrancheAddress
                break

            default:
                break
        }
        navigate('/detail', {state: {
            token,
            type,
            tradeAddress
        }, replace: true})
    }

    return (
        <MarketRowBox>
            <LeftBox>
                <img alt="" src={token.logoUrl} />
                <LeftName>{token.productTitle}</LeftName>
                <LeftSortName>{token.productEpoch}</LeftSortName>
            </LeftBox>

            <RightBox>
                <RightItem>
                    <RightItemColumn className="active">
                        <FormattedMessage id='markets.fix' defaultMessage="" values={{name: ''}} />
                    </RightItemColumn>

                    <RightItemColumn>
                        {token.fixedStatus}
                    </RightItemColumn>

                    <RightItemColumn>
                        <Statistic value={token.symbolADepositedBalance} precision={4} />
                    </RightItemColumn>

                    <RightItemColumn>
                        {
                            token.fixedApy ? 
                                <Statistic value={token.fixedApy} precision={2} suffix="%" />
                            :
                                'N/A'
                        }
                    </RightItemColumn>
                        
                    <RightItemColumn>
                        {
                            token.fixedStatus === 'Funding' ?
                                <Button type="fix" text="Deposit" onButClick={(type) => onButClick(type)} />
                            :
                                <DisButton>Deposit</DisButton>
                        }
                        
                    </RightItemColumn>
                </RightItem>

                <RightItem>
                    <RightItemColumn className="va">
                        <FormattedMessage id='markets.variable' defaultMessage="" values={{name: ''}} />
                    </RightItemColumn>

                    <RightItemColumn>
                        {token.variableStatus}
                    </RightItemColumn>

                    <RightItemColumn>
                        <Statistic value={token.symbolBDepositedBalance} precision={4} prefix='' />
                    </RightItemColumn>

                    <RightItemColumn>
                        {
                            token.variableApy ?
                            <Statistic value={token.variableApy} precision={2} suffix="%" />
                                :
                            'N/A'
                        }
                    </RightItemColumn>

                    <RightItemColumn>
                        {
                            token.variableStatus === 'Funding' ?
                                <Button type="variable" text="Deposit" onButClick={(type) => onButClick(type)} />
                            :
                                <DisRedButton>Deposit</DisRedButton>
                        }
                    </RightItemColumn>
                </RightItem>
            </RightBox>
        </MarketRowBox>
    )
}

export default MarketRow
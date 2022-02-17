
import styled from "styled-components"
import RedBgImg from 'images/RedBgImg.png'
import { FormattedMessage } from 'react-intl'
import RedApy from 'components/Card/RedApy'
import { Statistic } from 'antd'
import LiveRedProgress from 'components/Progress/LiveRedProgress'

const Cardbox = styled.div`
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

const CardContent = styled.div`
    box-sizing: border-box;
    padding: 20px 70px;
    margin-top: 100px;
    height: 100%;
`

const AmountShareBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 150px;
    .ant-statistic {
        .ant-statistic-content {
            .ant-statistic-content-prefix {
                font-size: 26px;
                font-family: DINPro-Medium, DINPro;
                font-weight: 500;
                color: var(--whiteColor);
            }
            .ant-statistic-content-suffix {
                font-size: 26px;
                font-family: DINPro-Medium, DINPro;
                font-weight: 500;
                color: var(--whiteColor);
            }
            .ant-statistic-content-value {
                .ant-statistic-content-value-decimal,
                .ant-statistic-content-value-int {
                    font-size: 26px;
                    font-family: DINPro-Medium, DINPro;
                    font-weight: 500;
                    color: var(--whiteColor);
                }
            }
        } 
    }
`

const AmountBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
    .label {
        font-size: 18px;
        font-family: DINPro-Medium, DINPro;
        font-weight: 500;
        color: #979FB5;
    }
`

const LiveRedCard = (props: any) => {
    return (
        <Cardbox>
            <CardTitle className="redCard">
                <FormattedMessage id='card.title.variant' defaultMessage="" values={{name: ''}} />
            </CardTitle>

            <CardContent>
                <RedApy title='Real-time APY' apy={props.variableApy} tip='Variable pool final APY as predicted based on th real-time APY if the underlying protocol' />

                <AmountShareBox>
                    <AmountBox>
                        <Statistic value={props.symbolBDepositedBalance} precision={2} suffix="" />
                        <div className="label">Total Amount</div>
                    </AmountBox>
                </AmountShareBox>

                <LiveRedProgress 
                    trancheInitTime={props.trancheInitTime}
                    tranchBTimeout={props.tranchBTimeout}
                    lockPeriod={props.lockPeriod}
                    gamePeriod={props.gamePeriod}
                />
            </CardContent>
        </Cardbox>
    )
}

export default LiveRedCard
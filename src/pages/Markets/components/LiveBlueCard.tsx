import styled from "styled-components"
import BlueBgImg from 'images/BlueBgImg.png'
import { FormattedMessage } from 'react-intl'
import BlueApy from 'components/Card/BlueApy'
import { Statistic } from 'antd'
import LiveBlueProgress from 'components/Progress/LiveBlueProgress'

const CardBox = styled.div`
    position: relative;
    background: url(${BlueBgImg}) no-repeat;
    background-size: 100% 100%;
    width: 525px;
    height: 676px;
    .blueCard {
        color: var(--butBorderColor);
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
    width: 100%;
    height: 100%;
    padding: 20px 70px;
    margin-top: 100px;
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

const LiveBlueCard = (props: any) => {
    return (
        <CardBox>
            <CardTitle className="blueCard">
                <FormattedMessage id='card.title.fix' defaultMessage="" values={{name: ''}} />
            </CardTitle>

            <CardContent>
                <BlueApy title='Fixed APY' apy={props.fixedApy} tip='Fix pool‘s fixed APY' />

                <AmountShareBox>
                    <AmountBox>
                        <Statistic value={props.symbolADepositedBalance} precision={2} suffix="" />
                        <div className="label">Total Amount</div>
                    </AmountBox>
                </AmountShareBox>

                <LiveBlueProgress 
                    trancheInitTime={props.trancheInitTime}
                    tranchBTimeout={props.tranchBTimeout}
                    lockPeriod={props.lockPeriod}
                    gamePeriod={props.gamePeriod}
                />
            </CardContent>
        </CardBox>
    )
}

export default LiveBlueCard
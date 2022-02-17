
import styled from "styled-components"
import RedBgImg from 'images/RedBgImg.png'
import { FormattedMessage } from 'react-intl'
import RedApy from 'components/Card/RedApy'
import { Statistic } from 'antd'
import { useEffect, useState } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getBalanceByTokenAddress } from 'hooks/useContractMethods'
import { usePossumSingerContract } from 'hooks/useContract'

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
    margin-top: 30px;
    height: 200px;
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
    border-right: 1px solid #1F2127;
    .label {
        font-size: 18px;
        font-family: DINPro-Medium, DINPro;
        font-weight: 500;
        color: #979FB5;
    }
`

const ShareBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex: 1;
    .label {
        font-size: 18px;
        font-family: DINPro-Medium, DINPro;
        font-weight: 500;
        color: #979FB5;
    }
`

const EndRedCard = (props: any) => {
    const [useBalance, setUseBalance] = useState(0)
    const possumContract = usePossumSingerContract()
    const tokenAddress = props.bTrancheAddress || ''

    const { library, account, chainId } = useActiveWeb3React()

    const fetchBalance = async () => {
        const { balance } = await getBalanceByTokenAddress(possumContract, tokenAddress, account)
        setUseBalance(balance)
    }

    useEffect(() => {
        if (chainId && account && library) {
            fetchBalance()
        }
    }, [library, account, chainId])

    return (
        <Cardbox>
            <CardTitle className="redCard">
                <FormattedMessage id='card.title.variant' defaultMessage="" values={{name: ''}} />
            </CardTitle>

            <CardContent>
                <RedApy title='Esitimated APY' apy={props.variableApy} tip='Variable pool final APY as predicted on the past performance of the underlying protocol' />

                <AmountShareBox>
                    <AmountBox>
                        <Statistic value={props.symbolBDepositedBalance} precision={2} suffix="" />
                        <div className="label">Total Amount</div>
                    </AmountBox>

                    <ShareBox>
                        <Statistic value={useBalance} precision={2} suffix="" />
                        <div className="label">Your Share</div>
                    </ShareBox>
                </AmountShareBox>
            </CardContent>
        </Cardbox>
    )
}

export default EndRedCard
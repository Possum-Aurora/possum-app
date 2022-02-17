import styled from "styled-components"
import { FormattedMessage } from 'react-intl'
import { useState, useEffect } from "react"
import { Statistic } from 'antd'
import progressLogo from 'assets/images/progressLogo.png'

const ProgressBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 40px;
    .redTitle {
        font-size: 18px;
        font-family: DINPro-Bold, DINPro;
        font-weight: bold;
        color: #FC077D;
        margin-right: 20px;
    }
    .blueTitle {
        font-size: 18px;
        font-family: DINPro-Black, DINPro;
        font-weight: 900;
        color: #2172E5;
        margin-left: 20px;
    }
    .progressCenter {
        flex: 1;
        display: flex;
        background: #191B1F;
        height: 50px;
        border-radius: 30px;
        position: relative;
        justify-content: center;
    }
`

const ProgressText = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 50px;
    top: 40px;
    margin-top: 20px;
`

const VariantText = styled.div`
    font-size: 14px;
    font-family: DINPro;
    /* color: #979FB5; */
    color: #FC077D;
    .ant-statistic {
        .ant-statistic-content {
            .ant-statistic-content-prefix {
                font-size: 26px;
                font-family: DINPro-Medium, DINPro;
                font-weight: 500;
                color: #FC077D;
            }
            .ant-statistic-content-suffix {
                font-size: 26px;
                font-family: DINPro-Medium, DINPro;
                font-weight: 500;
                color: #FC077D;
            }
            .ant-statistic-content-value {
                .ant-statistic-content-value-decimal,
                .ant-statistic-content-value-int {
                    font-size: 26px;
                    font-family: DINPro-Medium, DINPro;
                    font-weight: 500;
                    color: #FC077D;
                }
            }
        } 
    }
`

const FixedText = styled.div`
    font-size: 14px;
    font-family: DINPro;
    /* color: #979FB5; */
    color: #2172E5;
    .ant-statistic {
        .ant-statistic-content {
            .ant-statistic-content-prefix {
                font-size: 26px;
                font-family: DINPro-Medium, DINPro;
                font-weight: 500;
                color: #2172E5;
            }
            .ant-statistic-content-suffix {
                font-size: 26px;
                font-family: DINPro-Medium, DINPro;
                font-weight: 500;
                color: #2172E5;
            }
            .ant-statistic-content-value {
                .ant-statistic-content-value-decimal,
                .ant-statistic-content-value-int {
                    font-size: 26px;
                    font-family: DINPro-Medium, DINPro;
                    font-weight: 500;
                    color: #2172E5;
                }
            }
        } 
    }
`

const ProgressBlock = styled.div`
    position: relative;
    height: 10px;
    background: #fff;
    border-radius: 5px;
    margin-top: 20px;
    width: 1000px;
`

const VariableProgressBlock = styled.div`
    position: absolute;
    left: 0;
    height: 10px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background: #FC077D;
`

const FixedProgressBlock = styled.div`
    position: absolute;
    right: 0;
    height: 10px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background: #216CDA;
`

const ProgressLogoBox = styled.div`
    position: absolute;
    background: url(${progressLogo}) no-repeat;
    height: 36px;
    width: 30px;
    top: -15px;
    background-size: 100% 100%;
    z-index: 99;
`

const ProgessCom = (props: any) => {
    const symbolBDepositedBalance = props.symbolBDepositedBalance
    const symbolADepositedBalance = props.symbolADepositedBalance
    const [aPercent, setAPercent] = useState(0)
    const [bPercent, setBPercent] = useState(0)
    const [variableWidth, setVariableWidth] = useState(0)
    const [fixedWidth, setFixedWidth] = useState(0)

    useEffect(() => {
        initData()
    }, [aPercent, bPercent])

    const initData = () => {
        console.log(`symbolBDepositedBalance==${symbolBDepositedBalance}, symbolADepositedBalance==${symbolADepositedBalance}`)
        if (symbolBDepositedBalance && symbolADepositedBalance) {
            let total = symbolADepositedBalance + symbolBDepositedBalance
            let aPercent = parseFloat((symbolADepositedBalance / total * 100).toFixed(2))
            let bPercent = 100 - aPercent
            setVariableWidth(bPercent * 1000 / 100)
            setFixedWidth(1000 - (bPercent * 1000 / 100))
            setAPercent(aPercent)
            setBPercent(bPercent)
        } else if (symbolBDepositedBalance && !symbolADepositedBalance) {
            setAPercent(0)
            setBPercent(100)
            setVariableWidth(1000)
            setFixedWidth(0)
        } else if (!symbolBDepositedBalance && symbolADepositedBalance) {
            setAPercent(100)
            setBPercent(0)
            setVariableWidth(0)
            setFixedWidth(1000)
        }
    }

    return (
        <ProgressBox>
            <div className="redTitle">
                <FormattedMessage id='card.title.variant' defaultMessage="" values={{name: ''}} />
            </div>
            
            <div className="progressCenter">
                <ProgressBlock>
                    <VariableProgressBlock style={{width: variableWidth + 'px'}}></VariableProgressBlock>
                    <ProgressLogoBox style={{left: variableWidth + 'px'}} />
                    <FixedProgressBlock style={{width: fixedWidth + 'px'}}></FixedProgressBlock>
                </ProgressBlock>
                <ProgressText>
                    <VariantText><Statistic value={bPercent} precision={2} suffix="%" /></VariantText>
                    <FixedText><Statistic value={aPercent} precision={2} suffix="%" /></FixedText>
                </ProgressText>
            </div>

            <div className="blueTitle">
                <FormattedMessage id='card.title.fix' defaultMessage="" values={{name: ''}} />
            </div>
        </ProgressBox>
    )
}

export default ProgessCom
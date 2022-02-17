
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { Statistic } from 'antd'
import rectangle from 'assets/images/rectangle.png'
import React from 'react'

const EndBlueProgressBox = styled.div`
    position: relative;
    width: 385px;
    height: 12px;
    background: #112E57;
    border-radius: 6px;
    margin-top: 60px;
    margin-bottom: 20px;
`

const LowProgressBox = styled.div`
    position: absolute;
    left: 0;
    height: 12px;
    width: 50px;
    background: #686868;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
`

const UperProgressBox = styled.div`
    position: absolute;
    left: 185px;
    background: #2172E5;
    height: 12px;
    width: 30px;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
`

const TopTextBox = styled.div`
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    top: -25px;
`

const BottomTextBox = styled.div`
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: space-between;
    top: 5px;
`

const LeftText = styled.div`
    font-size: 14px;
    font-family: DINPro;
    color: #FFFFFF;
    margin-top: 10px;
`

const RightText = styled.div`
    font-size: 14px;
    font-family: DINPro;
    color: #FFFFFF;
    .ant-statistic {
        .ant-statistic-content {
            .ant-statistic-content-prefix {
                font-family: DINPro;
                font-weight: 500;
                color: #FFFFFF;
                font-size: 14px;
            }
            .ant-statistic-content-suffix {
                font-family: DINPro;
                font-weight: 500;
                color: #FFFFFF;
                font-size: 14px;
            }
            .ant-statistic-content-value {
                .ant-statistic-content-value-decimal,
                .ant-statistic-content-value-int {
                    font-family: DINPro;
                    font-weight: 500;
                    color: #FFFFFF;
                    font-size: 14px;
                }
            }
        } 
    }
`

const TopMintText = styled.div`
    position: absolute;
    left: 185px;
    font-size: 14px;
    font-family: DINPro;
    color: #FFFFFF;
`

const MintValueBox = styled.div`
    position: absolute;
    font-size: 14px;
    font-family: DINPro;
    color: #FFFFFF;
    left: 185px;
    .ant-statistic {
        .ant-statistic-content {
            .ant-statistic-content-prefix {
                font-family: DINPro;
                font-weight: 500;
                color: #FFFFFF;
                font-size: 14px;
            }
            .ant-statistic-content-suffix {
                font-family: DINPro;
                font-weight: 500;
                color: #FFFFFF;
                font-size: 14px;
            }
            .ant-statistic-content-value {
                .ant-statistic-content-value-decimal,
                .ant-statistic-content-value-int {
                    font-family: DINPro;
                    font-weight: 500;
                    color: #FFFFFF;
                    font-size: 14px;
                }
            }
        } 
    }
`

const CurrentTestBox = styled.div`
    position: absolute;
    font-size: 14px;
    font-family: DINPro;
    color: #FFFFFF;
    top: -40px;
    padding: 0 10px;
    line-height: 20px;
    height: 30px;
    background: url(${rectangle}) no-repeat;
    background-size: 100% 100%;
    .ant-statistic {
        line-height: inherit;
        .ant-statistic-content {
            .ant-statistic-content-prefix {
                font-family: DINPro;
                font-weight: 500;
                color: #FFFFFF;
                font-size: 14px;
            }
            .ant-statistic-content-suffix {
                font-family: DINPro;
                font-weight: 500;
                color: #FFFFFF;
                font-size: 14px;
            }
            .ant-statistic-content-value {
                .ant-statistic-content-value-decimal,
                .ant-statistic-content-value-int {
                    font-family: DINPro;
                    font-weight: 500;
                    color: #FFFFFF;
                    font-size: 14px;
                }
            }
        } 
    }
`

const LowUnSelectArea = styled.div`
    position: absolute;
    left: 0;
    height: 12px;
    width: 185px;
    background: #b9b7b7;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
`

const EndBlueProgress = (props: any) => {
    const progressWidth: number = 385
    const fixedWidth: number = 200
    const [lowProgressBoxWidth, setLowProgressBox] = useState(100)
    const [uperProgressBoxWidth, setUperProgressBoxWidth] = useState(60)
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(0)
    const [currentValue, setCurrentValue] = useState(0)
    const [currentLeftVal, serCurrentLeftVal] = useState(0)
    const maxVaribleToken = props.maxVaribleToken || 0
    const minVaribleToken = props.minVaribleToken || 0
    const symbolBDepositedBalance = props.symbolBDepositedBalance || 0
    const symbolADepositedBalance = props.symbolADepositedBalance || 0

    const initData = React.useCallback(() => {
        console.log(`
                maxVaribleToken==${props.maxVaribleToken}, 
                minVaribleToken==${props.minVaribleToken}, 
                symbolBDepositedBalance==${props.symbolBDepositedBalance},
                symbolADepositedBalance==${props.symbolADepositedBalance}
            `
        )
        let minRate = 1 - minVaribleToken / 10000
        let maxRate = 1 - maxVaribleToken / 10000
        let maxVal = minRate / (minVaribleToken / 10000) * symbolBDepositedBalance
        let minVal = maxRate / (maxVaribleToken / 10000) * symbolBDepositedBalance
        if (symbolADepositedBalance < minVal) {
            setLowProgressBox((symbolADepositedBalance / minVal) * 185)
            serCurrentLeftVal((symbolADepositedBalance / minVal) * 185 - 15)
            setUperProgressBoxWidth(0)
        } else {
            setLowProgressBox(185)
            setUperProgressBoxWidth(((symbolADepositedBalance - minVal) / (maxVal - minVal)) * 200)
            serCurrentLeftVal(((symbolADepositedBalance - minVal) / (maxVal - minVal)) * 200 - 15 + 185)
        }
        setMaxValue(maxVal)
        setMinValue(minVal)
        setCurrentValue(symbolADepositedBalance)
    }, [maxVaribleToken, minVaribleToken, props.maxVaribleToken, props.minVaribleToken, props.symbolADepositedBalance, props.symbolBDepositedBalance, symbolADepositedBalance, symbolBDepositedBalance])

    useEffect(() => {
        initData()
    }, [maxVaribleToken, minVaribleToken, symbolBDepositedBalance, symbolADepositedBalance, initData])

    return (
        <EndBlueProgressBox>
            <LowUnSelectArea></LowUnSelectArea>

            {
                lowProgressBoxWidth ? 
                    <LowProgressBox style={{width: lowProgressBoxWidth + 'px'}}></LowProgressBox>
                :
                    ''
            }
            

            {
                uperProgressBoxWidth ?
                    <UperProgressBox style={{width: uperProgressBoxWidth + 'px'}}></UperProgressBox>
                :
                    ''
            }
            

            <BottomTextBox>
                <LeftText>0</LeftText>
                <MintValueBox>
                    <Statistic value={minValue} precision={2} suffix="" />
                </MintValueBox>
                <RightText>
                    <Statistic value={maxValue} precision={2} suffix="" />
                </RightText>
            </BottomTextBox>

            <TopTextBox>
                <TopMintText>Min</TopMintText>
                <RightText>Max</RightText>
            </TopTextBox>

            <CurrentTestBox style={{left:  currentLeftVal + 'px'}}>
                <Statistic value={currentValue} precision={2} suffix="" />
            </CurrentTestBox>
        </EndBlueProgressBox>
    )
}
export default EndBlueProgress
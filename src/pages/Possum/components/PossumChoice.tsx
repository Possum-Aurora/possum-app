import styled from "styled-components"
import PossumChoiceBgImg from 'images/PossumChoiceBgImg.jpg'
import { FormattedMessage } from 'react-intl'
import { Statistic } from 'antd'
import { useState, useEffect } from 'react'
import ChoiceContent from './fixFunding/ChoiceContent'
import FixFunding from './fixFunding'
import { useAppSelector } from 'state/hooks'
import { PoolData } from "state/types"

const PossumChoiceBox = styled.div`
    background: url(${PossumChoiceBgImg}) no-repeat;
    background-size: 100% 100%;
    padding-bottom: 40px;
`

const PossumContent = styled.div`
    margin: auto;
    width: var(--mainContentWidth);
`

const ChoiceFundingContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const ListContent = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-top: 60px;
    .active {
        border-left: 1px solid var(--itemContentBorderColor);
    }
`

const ItemContent = styled.div`
    height: 140px;
    background: var(--headerBg);
    border-radius: 0 8px 8px 0;
    border-left: 1px solid var(--whiteColor);
    padding: 30px;
    .label {
        font-size: 18px;
        font-family: DINPro-Medium, DINPro;
        font-weight: 500;
        color: var(--itemContentLabelColor);
        margin-bottom: 10px;
    }
    .ant-statistic {
        .ant-statistic-content {
            .ant-statistic-content-prefix {
                font-size: 30px;
                font-family: DINPro-Bold, DINPro;
                font-weight: bold;
                color: var(--whiteColor);
            }
            .ant-statistic-content-suffix {
                font-size: 30px;
                font-family: DINPro-Bold, DINPro;
                font-weight: bold;
                color: var(--whiteColor);
            }
            .ant-statistic-content-value {
                .ant-statistic-content-value-decimal,
                .ant-statistic-content-value-int {
                    font-size: 30px;
                    font-family: DINPro-Bold, DINPro;
                    font-weight: bold;
                    color: var(--whiteColor);
                }
            }
        } 
    }
`

const PossumChoice = () => {
    const [totalUser, setTotalUser] = useState(10000000)
    const [totalTvl, setTotalTvl] = useState(0)
    const [totalRoi, setTotalRoi] = useState(130000)
    const [averageApy, setAverageApy] = useState(0)
    
    const list: PoolData[] = useAppSelector((state) => state.pool.poolList)
    useEffect(() => {
        const initData = () => {
            let tvl = 0
            let arr:Array<number> = []
            list.forEach((item: any) => {
                tvl += item.symbolBDepositedBalance + item.symbolADepositedBalance
                arr.push(item.fixedApy)
                arr.push(item.variableApy)
            })
            let maxAgeApy = Math.max(...arr)
            setAverageApy(maxAgeApy)
            setTotalTvl(tvl)
        }
        if (list && list.length) {
            initData()
        }
    }, [list])

    return (
        <PossumChoiceBox>
            <PossumContent>
                <ChoiceFundingContent>
                    <ChoiceContent />

                    <FixFunding />
                </ChoiceFundingContent>

                <ListContent>
                    <ItemContent className="active">
                        <div className="label">
                            <FormattedMessage id='possum.total.user' defaultMessage="" values={{name: ''}} />
                        </div>
                        <Statistic value={ totalUser } precision={4} />
                    </ItemContent>

                    <ItemContent>
                        <div className="label">
                            <FormattedMessage id='possum.total.tvl' defaultMessage="" values={{name: ''}} />
                        </div>
                        <Statistic value={ totalTvl } precision={4} />
                    </ItemContent>

                    <ItemContent className="active">
                        <div className="label">
                            <FormattedMessage id='possum.total.Roi' defaultMessage="" values={{name: ''}} />
                        </div>
                        <Statistic value={ totalRoi } precision={4} />
                    </ItemContent>

                    <ItemContent>
                        <div className="label">
                            <FormattedMessage id='possum.average.apy' defaultMessage="" values={{name: ''}} />
                        </div>
                        <Statistic value={ averageApy } precision={2} suffix='%' />
                    </ItemContent>
                </ListContent>
            </PossumContent>
        </PossumChoiceBox>
    )
}
export default PossumChoice
import styled from "styled-components"
import ItemCard from 'components/ItemCard'
import { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import Tabs from './components/Tabs'
import Column from 'components/Column'
import MarketRow from './components/MarketRow'
import RowItem from './components/RowItem'
import { useAppSelector } from 'state/hooks'
import { PoolData } from "state/types"
import SkeletonItem from './components/SkeletonItem'
import { useLocation } from 'react-router-dom'

const MarketsBox = styled.div`
    padding-top: 100px;
    padding-bottom: 60px;
`

const MarketsContent = styled.div`
    width: var(--mainContentWidth);
    margin: auto;
`

const MarketsList = styled.div`
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(4, 1fr);
`

const MarketsHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 50px;
    margin-bottom: 30px;
`

const MarketsHeaderTitle = styled.div`
    font-size: 24px;
    font-family: DINPro-Bold, DINPro;
    font-weight: bold;
    color: var(--whiteColor);
`

const MarketListRow = styled.div``

const Markets = () => {
    const location:any = useLocation() //获取跳转页面携带的值
    const type: string = location.state ? location.state.type : 'funding'
    const [currentKey, setCurrentKey] = useState('')
    const [totalTvl, setTotalTvl] = useState(0)
    const [fixedTvl, setFixedTvl] = useState(678676)
    const [variableTvl, setVariableTvl] = useState(45765)
    const [totalRoi, setTotalRoi] = useState(23432)
    const fundingColumnList:Array<any> = [
        { label: 'Vaults Type', key: '', tooltip: '' },
        { label: 'Pool', key: '', tooltip: '' },
        { label: 'Status', key: '', tooltip: '' },
        { label: 'Deposited', key: '', tooltip: '' },
        { label: 'Estimate APY ', key: '', tooltip: '' },
        { label: '', key: '', tooltip: '' },
    ]
    const liveColumnList:Array<any> = [
        { label: 'Vaults Type', key: '', tooltip: '' },
        { label: 'Ends in', key: '', tooltip: '' },
        { label: 'Var Deposited', key: '', tooltip: '' },
        { label: 'Current Variant Apy ', key: '', tooltip: '4242134' },
        { label: 'Protection Rate ', key: '', tooltip: 'fadfadfasdfadsf' },
        { label: 'Fixed Deposited', key: '', tooltip: '' },
        { label: 'Fixed Apy ', key: '', tooltip: 'Fixed Rate' },
    ]
    const closedColumnList:Array<any> = [
        { label: 'Vaults Type', key: '', tooltip: '' },
        { label: 'Ends in', key: '', tooltip: '' },
        { label: 'Var Deposited', key: '', tooltip: '' },
        { label: 'Variant APY ', key: '', tooltip: 'Variant APY' },
        { label: 'Protection Rate ', key: '', tooltip: 'fadfadfasdfadsf' },
        { label: 'Fixed Deposited ', key: '', tooltip: '' },
        { label: 'Fixed APY ', key: '', tooltip: 'Fixed APY' },
    ]
    const [listData, setListData] = useState<any[]>([])
    const [columnList, setColumnList] = useState(fundingColumnList)

    const list: PoolData[] = useAppSelector((state) => state.pool.poolList)

    useEffect(() => {
        console.log('type==', type)
        if (['funding', 'variable', 'fix'].includes(type)) {
            setCurrentKey('funding')
        } else {
            setCurrentKey(type)
        }
    }, [type])

    const tabItemClick = (type: string) => {
        setCurrentKey(type)
        switch (type) {
            case 'funding':
                setColumnList(fundingColumnList)
                break;
            
            case 'live':
                setColumnList(liveColumnList)
                break;
                     
            case 'closed':
                setColumnList(closedColumnList)
                break;       
        
            default:
                break;
        }
    }

    useEffect(() => {
        const initData = () => {
            let tvl = 0
            let fixTvl = 0
            let vTvl = 0
            list.forEach((item: any) => {
                tvl += item.symbolBDepositedBalance + item.symbolADepositedBalance
                fixTvl += item.symbolADepositedBalance
                vTvl += item.symbolBDepositedBalance
            })
            setFixedTvl(fixTvl)
            setVariableTvl(vTvl)
            setTotalTvl(tvl)
        }
        if (list && list.length) {
            setListData(list)
            initData()
        }
    }, [list])

    return (
        <MarketsBox>
            <MarketsContent>
                <MarketsList>
                    <ItemCard idStr='possum.total.tvl' value={totalTvl} precision={3} prefix='$' />
                    <ItemCard idStr='markets.fixed.tvl' value={fixedTvl} precision={3} prefix='$' />
                    <ItemCard idStr='markets.variable.tvl' value={variableTvl} precision={3} prefix='$' />
                    <ItemCard idStr='possum.total.Roi' value={totalRoi} precision={3} prefix='$' />
                </MarketsList>

                <MarketsHeader>
                    <MarketsHeaderTitle>
                        <FormattedMessage id='markets.vaultes' defaultMessage="" values={{name: ''}} />
                    </MarketsHeaderTitle>

                    <Tabs tabItemClick={tabItemClick} currentActive={currentKey} />
                </MarketsHeader>
                
                <Column dataList={columnList} />
                {
                    currentKey === 'funding' && listData.length === 0 ?
                        <MarketListRow>
                            <SkeletonItem />
                            <SkeletonItem />
                        </MarketListRow>
                    :
                        ''
                }

                {
                    currentKey === 'funding' && listData.length ?
                        <MarketListRow>
                            {
                                listData.map((item:any, index:number) =>
                                    !(item.fixedStatus === 'Closed' && item.variableStatus === 'Closed') ?
                                        <MarketRow
                                            key={index} 
                                            name={item.name}
                                            productEpoch={item.productEpoch}
                                            productTitle={item.productTitle}
                                            logoUrl={item.logoUrl}
                                            fixedStatus={item.fixedStatus}
                                            variableStatus={item.variableStatus}
                                            fixedApy={item.fixedApy}
                                            variableApy={item.variableApy}
                                            symbolADepositedBalance={item.symbolADepositedBalance}
                                            symbolBDepositedBalance={item.symbolBDepositedBalance}
                                            trancheInitTime={item.trancheInitTime}
                                            gamePeriod={item.gamePeriod}
                                            tranchBTimeout={item.tranchBTimeout}
                                            maxVaribleToken={item.maxVaribleToken}
                                            minVaribleToken={item.minVaribleToken}
                                            varibleTokenLimit={item.varibleTokenLimit}
                                            symbolA={item.symbolA}
                                            symbolB={item.symbolB}
                                            bTrancheAddress={item.bTrancheAddress}
                                            aTrancheAddress={item.aTrancheAddress}
                                            buyerCoinAddress={item.buyerCoinAddress}
                                            pid={item.pid}
                                            lockPeriod={item.lockPeriod}
                                            RISK={item.RISK}
                                        />
                                    :
                                        ''
                                )
                            }
                        </MarketListRow>
                    :
                        ''   
                }

                {
                    currentKey === 'live' ?
                        <MarketListRow>
                            {
                                listData.map((item:any, index:number) => 
                                    (item.fixedStatus === 'Closed' && item.variableStatus === 'Closed' && !item.isEarningsEnd) ?
                                        <RowItem 
                                            key={index}
                                            item={item}
                                            type={currentKey}
                                        />
                                    :
                                        ''
                                )
                            }
                        </MarketListRow>
                    :
                        ''
                }

                {
                    currentKey === 'closed' ?
                        <MarketListRow>
                            {
                                listData.map((item:any, index:number) => 
                                    item.isEarningsEnd ?
                                        <RowItem 
                                            key={index}
                                            item={item}
                                            type={currentKey}
                                        />
                                    :
                                        ''
                                )
                            }
                        </MarketListRow>
                    :
                        ''
                }
            </MarketsContent>
        </MarketsBox>
    )
}
export default Markets
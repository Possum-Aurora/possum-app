import styled from "styled-components"
import ItemCard from 'components/ItemCard'
import { FormattedMessage } from 'react-intl'
import Tabs from './components/Tabs'
import { useState } from 'react'
import Column from 'components/Column'
import { getTokenList } from 'constants/tokens'
import RowItem  from "./components/RowItem"
import HistoryTable from "./components/HistoryTable"
import useActiveWeb3React from 'hooks/useActiveWeb3React'

const PortfolioBox = styled.div`
    padding-top: 100px;
    padding-bottom: 60px;
`

const PortfolioContent = styled.div`
    width: var(--mainContentWidth);
    margin: auto;
`

const PortfolioList = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;
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

const ProtfolioTableContent = styled.div`
    box-sizing: border-box;
    background: #191B1F;
    border-radius: 8px;
    padding: 5px 30px 20px 30px;
    margin-top: 10px;
`

const Overview = () => {
    const [currentKey, setCurrentKey] = useState('funding')
    const { chainId } = useActiveWeb3React()
    const tokens = getTokenList(chainId)

    const fundingColumnList: Array<any> = [
        { label: 'Markets', key: '', tooltip: '' },
        { label: 'Pool', key: '', tooltip: '' },
        { label: 'Assets', key: '', tooltip: '' },
        { label: 'Value', key: '', tooltip: '' },
        { label: 'Settle Time', key: '', tooltip: '' },
        { label: 'APY', key: '', tooltip: 'fadfadfasdfadsf' },
    ]
    const [columnList, setColumnList] = useState(fundingColumnList)

    const tabItemClick = (type: string) => {
        setCurrentKey(type)
        switch (type) {
            case 'Funding':
                break;
            
            case 'Running':
                break;
                     
            case 'Claimming':
                break;       
        
            default:
                break;
        }
    }

    return (
        <PortfolioBox>
            <PortfolioContent>
                <PortfolioList>
                    <ItemCard idStr='portfolio.assets.possum' value={421342} precision={3} prefix='$' />
                    <ItemCard idStr='portfolio.fixed.tvl' value={532453} precision={3} prefix='$' />
                    <ItemCard idStr='portfolio.variable.tvl' value={3245345} precision={3} prefix='$' />
                </PortfolioList>

                <MarketsHeader>
                    <MarketsHeaderTitle>
                        <FormattedMessage id='markets.vaultes' defaultMessage="" values={{name: ''}} />
                    </MarketsHeaderTitle>

                    <Tabs tabItemClick={tabItemClick}/>
                </MarketsHeader>

                <Column dataList={columnList} />

                <ProtfolioTableContent>
                    {
                        tokens.map((item:any, index:number) => {
                            return (
                                <RowItem key={index} name={item.name} logoUrl={item.logoUrl} />
                            ) 
                        })
                    }
                </ProtfolioTableContent>

                <HistoryTable />
            </PortfolioContent>
            
        </PortfolioBox>
    )
}
export default Overview
import styled from "styled-components"
import { FormattedMessage } from 'react-intl'
import Column from 'components/Column'
import { useState } from 'react'
import { getTokenList } from 'constants/tokens'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import HistoryTableRowItem from "./HistoryTableRowItem"

const HistoryTableBox = styled.div`

`

const HistoryTableHeader = styled.div`
    margin: 30px 0;
    font-size: 24px;
    font-family: DINPro-Bold, DINPro;
    font-weight: bold;
    color: var(--whiteColor);
`

const HistoryTableContent = styled.div`
    margin-top: 10px;
    background: var(--headerBg);
    border-radius: 8px;
    box-sizing: border-box;
    padding: 10px 30px 30px 30px;
`

const HistoryTable = () => {
    const { chainId } = useActiveWeb3React()
    const tokens = getTokenList(chainId)
    const [columnList, setColumnList] = useState([
        { label: 'Action', key: '', tooltip: '' },
        { label: 'Market', key: '', tooltip: '' },
        { label: 'Assets', key: '', tooltip: '' },
        { label: 'Value', key: '', tooltip: '' },
        { label: 'Time', key: '', tooltip: '' }
    ])

    return (
        <HistoryTableBox>
            <HistoryTableHeader>
                <FormattedMessage id='portfolio.transaction.history' defaultMessage="" values={{name: ''}} />
            </HistoryTableHeader>

            <Column dataList={columnList} />

            <HistoryTableContent>
                {
                    tokens.map((item:any, index:number) => {
                        return (
                            <HistoryTableRowItem key={index} name={item.name} logoUrl={item.logoUrl} />
                        ) 
                    })
                }
            </HistoryTableContent>
        </HistoryTableBox>
    )
}

export default HistoryTable
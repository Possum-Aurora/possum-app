import styled from "styled-components"
import { Statistic } from 'antd'
import { useNavigate } from "react-router-dom"
import { timestampToTime } from 'utils/timer'
import { Token } from 'state/types'

const RowItemBox = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 100px;
    background: var(--headerBg);
    border-radius: 8px;
    margin-top: 20px;
`

const ColumnItem = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-family: DINPro-Medium, DINPro;
    font-weight: 500;
    color: var(--whiteColor);
    .ant-statistic {
        .ant-statistic-content {
            .ant-statistic-content-prefix {
                font-size: 16px;
                font-family: DINPro-Medium, DINPro;
                font-weight: 500;
            }
            .ant-statistic-content-suffix {
                font-size: 16px;
                font-family: DINPro-Medium, DINPro;
                font-weight: 500;
            }
            .ant-statistic-content-value {
                .ant-statistic-content-value-decimal,
                .ant-statistic-content-value-int {
                    font-size: 16px;
                    font-family: DINPro-Medium, DINPro;
                    font-weight: 500;
                }
            }
        } 
    }
    img {
        width: 40px;
        margin-right: 10px;
    }
    .productEpoch {
        font-size: 14px;
        font-family: DINPro;
        color: #959DB3;
    }
`

const RowItem = (props:any) => {
    let navigate = useNavigate()
    const item:Token = props.item
    const itemClick = () => {
        console.log('item==', item)
        navigate('/detail', {state: {
            type: props.type,
            token: item
        }, replace: true})
    }
            
    return (
        <RowItemBox onClick={itemClick}>
            <ColumnItem>
                <img alt="" src={item.logoUrl} />
                <div>
                    <div>{item.productTitle}</div>
                    <div className="productEpoch">{item.productEpoch}  </div>  
                </div>
            </ColumnItem>
            <ColumnItem>{timestampToTime(item.trancheInitTime + item.lockPeriod + item.gamePeriod + item.tranchBTimeout)}</ColumnItem>
            <ColumnItem>
                <Statistic value={item.symbolBDepositedBalance} precision={2} prefix="" valueStyle={{ color: '#fff' }} />
            </ColumnItem>
            <ColumnItem>
                <Statistic value='6.7' precision={2} suffix="%" valueStyle={{ color: '#26A27C' }} />
            </ColumnItem>
            <ColumnItem>
                <Statistic value={item.RISK / 100} precision={2} suffix="%" valueStyle={{ color: '#26A27C' }} />
            </ColumnItem>
            <ColumnItem>
                <Statistic value={item.symbolADepositedBalance} precision={2} prefix="" valueStyle={{ color: '#fff' }} />
            </ColumnItem>
            <ColumnItem>
                <Statistic value={item.fixedApy} precision={2} suffix="%" valueStyle={{ color: '#26A27C' }} />
            </ColumnItem>
        </RowItemBox>
    )
}

export default RowItem
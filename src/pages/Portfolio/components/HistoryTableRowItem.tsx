import styled from "styled-components"
import { Statistic } from 'antd'
import { Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

const RowItemBox = styled.div`
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    background: var(--headerBg);
    padding: 20px 0;
    border-bottom: 1px solid #2C2C2C;
`

const RowItemColumn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    font-size: 18px;
    font-family: DINPro-Medium, DINPro;
    font-weight: 500;
    color: var(--whiteColor);
    img {
        width: 40px;
    }
    .variable {
        cursor: pointer;
        font-size: 18px;
        font-family: DINPro-Medium, DINPro;
        font-weight: 500;
        color: var(--redCardColor);
    }
    .fix {
        cursor: pointer;
        font-size: 18px;
        font-family: DINPro-Medium, DINPro;
        font-weight: 500;
        color: var(--switchWalletBorderBgColor);
    }
    .variable:hover {
        opacity: .7;
    }
    .fix:hover {
        opacity: .7;
    }
    .ant-statistic {
        .ant-statistic-content {
            .ant-statistic-content-prefix {
                font-size: 18px;
                font-family: DINPro-Medium, DINPro;
                font-weight: 500;
            }
            .ant-statistic-content-suffix {
                font-size: 18px;
                font-family: DINPro-Medium, DINPro;
                font-weight: 500;
            }
            .ant-statistic-content-value {
                .ant-statistic-content-value-decimal,
                .ant-statistic-content-value-int {
                    font-size: 18px;
                    font-family: DINPro-Medium, DINPro;
                    font-weight: 500;
                }
            }
        } 
    }
`

const ColumInfo = styled.div`
    margin-left: 10px;
    .name {
        font-size: 18px;
        font-family: DINPro-Medium, DINPro;
        font-weight: 500;
        color: var(--whiteColor);
        line-height: 21px;
    }
    .sortName {
        font-size: 14px;
        font-family: DINPro;
        color: var(--itemContentLabelColor);
    }
`

const HistoryTableRowItem = (props: any) => {
    const item: any = props

    const depositVariable = (item: any) => {
        console.log('item==', item)
    }

    const depositFix = (item: any) => {
        console.log('item==', item)
    }

    return (
        <RowItemBox>
             <RowItemColumn>
                <div className="variable" onClick={() => depositVariable(item)}>Deposit in Variable</div>
                <div className="fix"  onClick={() => depositFix(item)}>Deposit in Fix</div>
            </RowItemColumn>

            <RowItemColumn>
                <img alt="" src={item.logoUrl} />
                <ColumInfo>
                    <div className="name">
                        {item.name}-1M
                        <Tooltip placement="topLeft" title={item.tooltip}>
                            <QuestionCircleOutlined />
                        </Tooltip>
                    </div>
                    <div className="sortName">Epoch 9</div>
                </ColumInfo>
            </RowItemColumn>

           
            <RowItemColumn>
                <Statistic value='67678' precision={2} suffix=" ETH" valueStyle={{ color: '#fff' }} />
            </RowItemColumn>

            <RowItemColumn>
                <Statistic value='67678' precision={2} suffix=" ETH" valueStyle={{ color: '#fff' }} />
            </RowItemColumn>

            <RowItemColumn>
                2022/01/01
            </RowItemColumn>
        </RowItemBox>
    )
}

export default HistoryTableRowItem
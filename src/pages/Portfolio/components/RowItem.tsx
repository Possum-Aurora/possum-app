import styled from "styled-components"
import { Statistic } from 'antd'

const RowItemBox = styled.div`
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    background: var(--mainBgColoe);
    border-radius: 8px;
    margin-top: 20px;
    padding: 15px 0;
`

const RowItemColumn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    img {
        width: 40px;
    }
    .variable {
        font-size: 16px;
        font-family: DINPro-Medium, DINPro;
        font-weight: 500;
        color: var(--redCardColor);
    }
    .fix {
        font-size: 18px;
        font-family: DINPro-Medium, DINPro;
        font-weight: 500;
        color: var(--switchWalletBorderBgColor);
    }
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
`

const ColumInfo = styled.div`
    margin-left: 20px;
    .name {
        font-size: 16px;
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

const RowItem = (props: any) => {
    const item: any = props

    return (
        <RowItemBox>
            <RowItemColumn>
                <img alt="" src={item.logoUrl} />
                <ColumInfo>
                    <div className="name">{item.name}-1M</div>
                    <div className="sortName">Epoch 9</div>
                </ColumInfo>
            </RowItemColumn>

            <RowItemColumn>
                <div className="variable">Variable</div>
                <div className="fix">Fix</div>
            </RowItemColumn>

            <RowItemColumn>
                <Statistic value='67678' precision={2} suffix=" ETH" valueStyle={{ color: '#fff' }} />
            </RowItemColumn>

            <RowItemColumn>
                <Statistic value='67678' precision={2} suffix=" ETH" valueStyle={{ color: '#fff' }} />
            </RowItemColumn>

            <RowItemColumn>
                <Statistic value='67678' precision={2} prefix="$ " valueStyle={{ color: '#fff' }} />
            </RowItemColumn>

            <RowItemColumn>
                <Statistic value='23' precision={2} suffix=" %" valueStyle={{ color: '#26A27C' }} />
            </RowItemColumn>
        </RowItemBox>
    )
}

export default RowItem
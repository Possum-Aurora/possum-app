import styled from "styled-components"
import { FormattedMessage } from 'react-intl'
import { Statistic } from 'antd'

const ItemCardBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 140px;
    background: #191B1F;
    border-radius: 8px;
    padding-left: 30px;
    .ant-statistic {
        .ant-statistic-content {
            .ant-statistic-content-prefix {
                font-size: 28px;
                font-family: DINPro-Bold, DINPro;
                font-weight: bold;
                color: var(--whiteColor);
            }
            .ant-statistic-content-suffix {
                font-size: 28px;
                font-family: DINPro-Bold, DINPro;
                font-weight: bold;
                color: var(--whiteColor);
            }
            .ant-statistic-content-value {
                .ant-statistic-content-value-decimal,
                .ant-statistic-content-value-int {
                    font-size: 28px;
                    font-family: DINPro-Bold, DINPro;
                    font-weight: bold;
                    color: var(--whiteColor);
                }
            }
        } 
    }
`

const ItemTitle = styled.div`
    font-size: 18px;
    font-family: DINPro-Medium, DINPro;
    font-weight: 500;
    color: var(--itemContentLabelColor);
`

interface MessageModal {
    idStr: string,
    value: number,
    precision: number,
    prefix: string
} 

const ItemCard = ({
    idStr,
    value,
    precision,
    prefix
}:MessageModal) => {
    return (
        <ItemCardBox>
            <ItemTitle>
                <FormattedMessage id={ idStr } defaultMessage="" values={{name: ''}} />
            </ItemTitle>
            <Statistic value={ value } precision={precision} prefix='$' />
        </ItemCardBox>
    )
}

export default ItemCard
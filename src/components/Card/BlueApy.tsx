import styled from "styled-components"
import { Statistic } from 'antd'
import { Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

const BlueApyBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 237px;
    height: 237px;
    margin: 0 auto;
    margin-top: 20px;
    background: linear-gradient(180deg, #00265C 0%, #216CDA 100%);
    border-radius: 50%;
    border: 1px solid #216CDA;
    .ant-statistic {
        .ant-statistic-content {
            .ant-statistic-content-prefix {
                font-size: 40px;
                font-family: DINPro-Medium, DINPro;
                font-weight: 500;
                color: var(--whiteColor);
            }
            .ant-statistic-content-suffix {
                font-size: 40px;
                font-family: DINPro-Medium, DINPro;
                font-weight: 500;
                color: var(--whiteColor);
            }
            .ant-statistic-content-value {
                .ant-statistic-content-value-decimal,
                .ant-statistic-content-value-int {
                    font-size: 40px;
                    font-family: DINPro-Medium, DINPro;
                    font-weight: 500;
                    color: var(--whiteColor);
                }
            }
        } 
    }
    .esitimated {
        font-size: 18px;
        font-family: DINPro;
        color: #FFFFFF;
    }
`

const BlueApy = (props: any) => {
    return (
        <BlueApyBox>
            <Statistic value={props.apy} precision={2} suffix="%" />
            <div className="esitimated">
                {props.title}
                <Tooltip placement="topLeft" title={props.tip}>
                    <QuestionCircleOutlined />
                </Tooltip>
            </div>
        </BlueApyBox>
    )
}

export default BlueApy
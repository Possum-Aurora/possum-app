import styled from "styled-components"
import { Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

const ColumnBox = styled.div`
    display: flex;
    align-items: center;
    height: 60px;
    background: var(--headerBg);
    border-radius: 8px;
`

const ColumnItem = styled.div`
    flex: 1;
    text-align: center;
    font-size: 14px;
    font-family: DINPro-Medium, DINPro;
    font-weight: 500;
    color: var(--columnColor);
`

const Column = (props:any) => {
    const dataList = props.dataList || []

    return (
        <ColumnBox>
            {
                dataList.map((item:any, index:number) => {
                    return (
                        <ColumnItem key={index}>
                            {item.label}
                            {
                                item.tooltip ?
                                    <Tooltip placement="topLeft" title={item.tooltip}>
                                        <QuestionCircleOutlined />
                                    </Tooltip>
                                :
                                ''
                            }
                            
                        </ColumnItem>
                    )
                })
            }
        </ColumnBox>
    )
}

export default Column
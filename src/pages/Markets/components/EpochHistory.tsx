import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import Column from 'components/Column'
import { useState } from 'react'
import { Statistic } from 'antd'

const EpochHistoryBox = styled.div`
    margin-top: 50px;
`

const EpochHiostoryTitle = styled.div`
    font-size: 24px;
    font-family: DINPro-Bold, DINPro;
    font-weight: bold;
    color: #FFFFFF;
    margin: 30px 0;
`

const EpochHistoryContent = styled.div`
    margin-top: 10px;
    background: #191B1F;
    border-radius: 8px;
    padding: 0 10px;
`

const EpochHistoryTableRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 0;
    border-bottom: 1px solid #2C2C2C;
`

const EpochHistoryTableColumn = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    .label {
        font-size: 18px;
        font-family: DINPro-Medium, DINPro;
        font-weight: 500;
        color: #FFFFFF;
    }
    .date {
        font-size: 16px;
        font-family: DINPro;
        color: #979FB5;
    }
`

const EpochHistory = () => {
    const [columnList, setColumnList] = useState([
        { label: 'Epoch/Date', key: '', tooltip: '' },
        { label: 'Var Apy', key: '', tooltip: 'Variable APY Variable Pool‘s Final APY' },
        { label: 'Fixed APY', key: '', tooltip: 'APY that Fixed Pool adopted which was fixed from the beginning' },
        { label: 'Protection Rate', key: '', tooltip: 'Maximized loss that variable Pool can bear' },
        { label: 'Var Liquidity', key: '', tooltip: '' },
        { label: 'Fixed Liquidity', key: '', tooltip: '' },
        { label: 'Underlying APY', key: '', tooltip: 'The underlying protocol APY during this time period' },
    ])

    return (
        <EpochHistoryBox>
            <EpochHiostoryTitle>
                <FormattedMessage id='epoch.history' defaultMessage="" values={{name: ''}} />
            </EpochHiostoryTitle>

            <Column dataList={columnList} />

            <EpochHistoryContent>
                <EpochHistoryTableRow>
                    <EpochHistoryTableColumn>
                        <div className='label'>Epoch 8</div>
                        <div className='date'>2021/01/02</div>
                        <div className='date'>2021/01/03</div>
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='32' precision={2} suffix="%" valueStyle={{ color: '#fff' }} />
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='44' precision={2} suffix="%" valueStyle={{ color: '#fff' }} />
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='22' precision={2} suffix="%" valueStyle={{ color: '#fff' }} />
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='2224345' precision={2} suffix="" valueStyle={{ color: '#fff' }} />
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='52345345' precision={2} suffix="" valueStyle={{ color: '#fff' }} />
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='56' precision={2} suffix="%" valueStyle={{ color: '#1DFDB8' }} />
                    </EpochHistoryTableColumn>
                </EpochHistoryTableRow>

                <EpochHistoryTableRow>
                    <EpochHistoryTableColumn>
                        <div className='label'>Epoch 8</div>
                        <div className='date'>2021/01/02</div>
                        <div className='date'>2021/01/03</div>
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='32' precision={2} suffix="%" valueStyle={{ color: '#fff' }} />
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='44' precision={2} suffix="%" valueStyle={{ color: '#fff' }} />
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='22' precision={2} suffix="%" valueStyle={{ color: '#fff' }} />
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='2224345' precision={2} suffix="" valueStyle={{ color: '#fff' }} />
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='52345345' precision={2} suffix="" valueStyle={{ color: '#fff' }} />
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='56' precision={2} suffix="%" valueStyle={{ color: '#1DFDB8' }} />
                    </EpochHistoryTableColumn>
                </EpochHistoryTableRow>

                <EpochHistoryTableRow>
                    <EpochHistoryTableColumn>
                        <div className='label'>Epoch 8</div>
                        <div className='date'>2021/01/02</div>
                        <div className='date'>2021/01/03</div>
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='32' precision={2} suffix="%" valueStyle={{ color: '#fff' }} />
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='44' precision={2} suffix="%" valueStyle={{ color: '#fff' }} />
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='22' precision={2} suffix="%" valueStyle={{ color: '#fff' }} />
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='2224345' precision={2} suffix="" valueStyle={{ color: '#fff' }} />
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='52345345' precision={2} suffix="" valueStyle={{ color: '#fff' }} />
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='56' precision={2} suffix="%" valueStyle={{ color: '#1DFDB8' }} />
                    </EpochHistoryTableColumn>
                </EpochHistoryTableRow>

                <EpochHistoryTableRow>
                    <EpochHistoryTableColumn>
                        <div className='label'>Epoch 8</div>
                        <div className='date'>2021/01/02</div>
                        <div className='date'>2021/01/03</div>
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='32' precision={2} suffix="%" valueStyle={{ color: '#fff' }} />
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='44' precision={2} suffix="%" valueStyle={{ color: '#fff' }} />
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='22' precision={2} suffix="%" valueStyle={{ color: '#fff' }} />
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='2224345' precision={2} suffix="" valueStyle={{ color: '#fff' }} />
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='52345345' precision={2} suffix="" valueStyle={{ color: '#fff' }} />
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='56' precision={2} suffix="%" valueStyle={{ color: '#1DFDB8' }} />
                    </EpochHistoryTableColumn>
                </EpochHistoryTableRow>

                <EpochHistoryTableRow>
                    <EpochHistoryTableColumn>
                        <div className='label'>Epoch 8</div>
                        <div className='date'>2021/01/02</div>
                        <div className='date'>2021/01/03</div>
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='32' precision={2} suffix="%" valueStyle={{ color: '#fff' }} />
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='44' precision={2} suffix="%" valueStyle={{ color: '#fff' }} />
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='22' precision={2} suffix="%" valueStyle={{ color: '#fff' }} />
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='2224345' precision={2} suffix="" valueStyle={{ color: '#fff' }} />
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='52345345' precision={2} suffix="" valueStyle={{ color: '#fff' }} />
                    </EpochHistoryTableColumn>
                    <EpochHistoryTableColumn>
                        <Statistic value='56' precision={2} suffix="%" valueStyle={{ color: '#1DFDB8' }} />
                    </EpochHistoryTableColumn>
                </EpochHistoryTableRow>
            </EpochHistoryContent>
        </EpochHistoryBox>
    )
}

export default EpochHistory
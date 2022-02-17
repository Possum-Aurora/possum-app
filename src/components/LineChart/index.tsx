import styled from "styled-components"
import ReactEcharts from 'echarts-for-react'
import { useState, useEffect } from 'react'

const LineChartBox = styled.div`
    height: 170px;
    .chart-content {
        width: 100% !important;
        height: 100% !important;
    }
`

const LineChart = (props:any) => {
    const [option, setOption ] = useState({})
    const [showLoading, setShowLoading] = useState(true)
    const type:string = props.type

    useEffect(() => {
        // useEffect中异步函数采用IIFE写法,立即调用的函数式表达式
        (async function name() {
            if (type === 'PossumVariableJoinNow') {
                initRedData()
            } else if (type === 'PossumFixedJoinNow') {
                initBlueData()
            }
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const initRedData = () => {
        let optionsStyle:any = {
            lineStyleColor: '#FC077D',
            colorStartColor: '#8A0B49',
            colorStopColor: '#2B0B1C',

            lineTStyleColor: '#F4F1F3',
            colorTStartColor: '#CAABBA',
            colorTStopColor: '#391F2C',
        }
        initPosition(optionsStyle)
    }

    const initBlueData = () => {
        let optionsStyle:any = {
            lineStyleColor: '#1B88FF',
            colorStartColor: '#13478A',
            colorStopColor: '#0C1727',

            lineTStyleColor: '#F4F1F3',
            colorTStartColor: '#ACB9CA',
            colorTStopColor: '#1A2231',
        }
        initPosition(optionsStyle)
    }

    const initPosition = (optionsStyle:any) => {
        setOption({
            tooltip: {
                trigger: 'axis',
                show: true,
                showContent: true,
                axisPointer: {
                    type: 'cross'
                }
            },
            title: {
                left: 'left',
                text: '',
                show: false
            },
            toolbox: {
                show: false,
                feature: {
                    dataZoom: {},
                    restore: {},
                    saveAsImage: {}
                }
            },
            grid:{
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                backgroundColor: '#fff'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                splitLine: {
                    show: false
                },
                show: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value',
                show: true,
                scale: true,
                boundaryGap: [0, '100%'],
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                min: function (value:any) {
                    return value.min
                },
                max: function (value:any) {
                    return value.max
                }
            },
            series: [
                {
                    name: 'Apy:',
                    type: 'line',
                    symbol: 'none',
                    areaStyle: {
                        // color : '#ffffff'
                    },
                    lineStyle:{
                        color: optionsStyle.lineStyleColor
                    },
                    itemStyle: {
                        barBorderRadius:  [5, 5, 0, 0],
                        color: {
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: optionsStyle.colorStartColor
                            }, {
                                offset: 1,
                                color: optionsStyle.colorStopColor
                            }],
                            global: false
                        }
                    },
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: 'Price:',
                    type: 'line',
                    symbol: 'none',
                    areaStyle: {
                        // color : '#ffffff'
                    },
                    lineStyle:{
                        color: optionsStyle.lineTStyleColor
                    },
                    itemStyle: {
                        barBorderRadius:  [5, 5, 0, 0],
                        color: {
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: optionsStyle.colorTStartColor
                            }, {
                                offset: 1,
                                color: optionsStyle.colorTStopColor
                            }],
                            global: false
                        }
                    },
                    data: [150, 232, 201, 154, 190, 330, 410]
                }
            ]
        })
        setShowLoading(false)
    }

    return (
        <LineChartBox>
            <ReactEcharts 
                className="chart-content"
                option={option}
                showLoading={showLoading}
                loadingOption={{
                    text: 'L o a d i n g . . .',
                    maskColor: '#020b1e92',
                    color: type === 'PossumVariableJoinNow' ? '#FC077D' : '#177FFB',
                    textColor: type === 'PossumVariableJoinNow' ? '#FC077D' : '#177FFB',
                }}
            />
        </LineChartBox>
    )
}

export default LineChart
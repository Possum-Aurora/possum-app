import styled from 'styled-components'
import rdio from 'images/rdio.png'
import { useEffect } from 'react'

const MoveProgressBox = styled.div`
    position: relative;
`

const ProgressContent = styled.div`
    position: relative;
    width: 100%;
    height: 12px;
    background: #4D293A;
    border-radius: 5px;
    .radio {
        position: absolute;
        left: 110px;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        background: red;
        background: url(${rdio}) no-repeat;
        background-size: 100% 100%;
        top: 50%;
        transform: translate(-50%, -50%);/*相对于自己的百分比*/
        z-index: 99;
    }
`

const ProgressSuccess = styled.div`
    background: #FC077D;
    position: absolute;
    height: 100%;
    left: 100px;
    /* width: 100px; */
`

const ProgressFail = styled.div`
    position: absolute;
    height: 100%;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background: #686868;;
    left: 0;
    z-index: 2;
    width: 100px;
`

const ProgressFailContent = styled.div`
    position: absolute;
    height: 100%;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background: blue;
    width: 100px;
    left: 0;
`

const MoveProgress = (props: any) => {
    useEffect(() => {
        initEvent()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const initEvent = () => {
        let isMouseDown: boolean = false
        let constantWidth = 15
        let sliderDocsBox: any = document.getElementById('sliderDocsId')
        let progressContentDom: any = document.getElementById('progressContentId')
        let progressContentDomWidth = progressContentDom.clientWidth
        console.log('progressContentDomWidth==', progressContentDomWidth)
        sliderDocsBox.onmousedown = function (ev: any) {
            isMouseDown = true
            let sliderDocsLeft = sliderDocsBox.offsetLeft
            let e = ev || window.event
            let mouseX = e.clientX
            window.onmousemove = function (ev: any) {
                if (!isMouseDown) {
                    return false
                }
                let e: any = ev || window.event
                let moveL = e.clientX - mouseX
                let newL = sliderDocsLeft + moveL
                if ( newL > progressContentDomWidth - constantWidth) {
                    newL = progressContentDomWidth - constantWidth
                } else if (newL <= constantWidth) {
                    newL = constantWidth
                }
                console.log('newL==', newL)
                sliderDocsBox.style.left = newL + 'px'
                updateSuccessOrFailDom(newL)
                updateApy(newL)
            }

            window.onmouseup = function () {
                isMouseDown = false
                window.onmousemove = null
                return false
            }
        }
    }

    const updateSuccessOrFailDom = (left: number) => {
        const zeroLeft: number = 110
        let progressSuccessDom: any = document.getElementById('progressSuccessId')
        let progressFailDom: any = document.getElementById('progressFailId')
        if (left <= zeroLeft) {
            progressSuccessDom.style.width = 0 + 'px'
            progressFailDom.style.width = left + 'px'
        } else if (left > zeroLeft) {
            progressSuccessDom.style.width = (left - 100) + 'px'
        }
        
    }

    const updateApy = (left: number) => {
        let apy: number = 0
        const maxLeft: number = 370
        const zeroLeft: number = 110
        const minLeft: number = 15
        if (left === maxLeft) {
            apy = 100
        } else if (left > zeroLeft && left < maxLeft) {
            let moveLeft: number = left - zeroLeft
            apy = (moveLeft / (maxLeft - zeroLeft)) * 100
        } else if (left === zeroLeft) {
            apy =0
        } else if (left < zeroLeft && left > minLeft) {
            apy = -((zeroLeft - left + minLeft) / zeroLeft) * 30
        }else if (left <= minLeft) {
            apy = -30
        }
        props.updateEsitimatedApy(apy)
    }

    return (
        <MoveProgressBox>
            <ProgressContent id='progressContentId'>
                <ProgressSuccess id='progressSuccessId'></ProgressSuccess>

                <ProgressFailContent>
                    <ProgressFail id='progressFailId'></ProgressFail>
                </ProgressFailContent>
                

                <div id="sliderDocsId" className='radio'></div>
            </ProgressContent>
        </MoveProgressBox>
    )
}

export default MoveProgress
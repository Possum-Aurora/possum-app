import styled from 'styled-components'
import { timestampToTime } from 'utils/timer'

const LiveRedProgressBox = styled.div`
    position: relative;
    width: 100%;
    height: 12px;
    background: #4D293A;
    border-radius: 5px;
    margin-top: 30px;
`

const TopContent = styled.div`
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: space-between;
    top: -25px;
`

const BottomContent = styled.div`
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: space-between;
    top: 15px;
`

const LeftText = styled.div`
    font-size: 14px;
    font-family: DINPro;
    color: #FFFFFF;
`

const RightText = styled.div`
    font-size: 14px;
    font-family: DINPro;
    color: #FFFFFF;
`

const VariableValueProgress = styled.div`
    position: absolute;
    height: 12px;
    background: #FC077D;
    border-radius: 5px;
    width: 200px;
`

const LiveRedProgress = (props: any) => {
    return (
        <LiveRedProgressBox>
            <TopContent>
                <LeftText>{timestampToTime(props.trancheInitTime)}</LeftText>
                <RightText>{timestampToTime(props.trancheInitTime + props.tranchBTimeout)}</RightText>
            </TopContent>

            <BottomContent>
                <LeftText>Start</LeftText>
                <RightText>End</RightText>
            </BottomContent>

            <VariableValueProgress></VariableValueProgress>
        </LiveRedProgressBox>
    )
}
export default LiveRedProgress
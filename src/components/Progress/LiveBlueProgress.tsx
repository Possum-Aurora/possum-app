import styled from 'styled-components'
import { timestampToTime } from 'utils/timer'

const LiveRedProgressBox = styled.div`
    position: relative;
    width: 100%;
    height: 12px;
    background: #112E57;
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

const FixedValueProgress = styled.div`
    position: absolute;
    height: 12px;
    background: #2172E5;
    border-radius: 5px;
    width: 300px;
`

const LiveBlueProgress = (props: any) => {
    return (
        <LiveRedProgressBox>
            <TopContent>
                <LeftText>{timestampToTime(props.trancheInitTime + props.tranchBTimeout)}</LeftText>
                <RightText>{timestampToTime(props.trancheInitTime + props.tranchBTimeout + props.gamePeriod)}</RightText>
            </TopContent>
            <BottomContent>
                <LeftText>Start</LeftText>
                <RightText>End</RightText>
            </BottomContent>

            <FixedValueProgress></FixedValueProgress>
        </LiveRedProgressBox>
    )
}
export default LiveBlueProgress
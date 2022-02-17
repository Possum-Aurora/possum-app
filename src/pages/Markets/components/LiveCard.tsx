import styled from "styled-components"
import LiveRedCard from './LiveRedCard'
import LiveBlueCard from './LiveBlueCard'

const LiveCardBox = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 50px;
`

const LiveCard = (props: any) => {
    return (
        <LiveCardBox>
            <LiveRedCard 
                symbolBDepositedBalance= {props.symbolBDepositedBalance}
                variableApy = {props.variableApy}
                trancheInitTime={props.trancheInitTime}
                tranchBTimeout={props.tranchBTimeout}
                lockPeriod={props.lockPeriod}
                gamePeriod={props.gamePeriod}
            />

            <LiveBlueCard 
                symbolADepositedBalance= {props.symbolADepositedBalance}
                fixedApy = {props.fixedApy}
                trancheInitTime={props.trancheInitTime}
                tranchBTimeout={props.tranchBTimeout}
                lockPeriod={props.lockPeriod}
                gamePeriod={props.gamePeriod}           
            />
        </LiveCardBox>
    )
}

export default LiveCard
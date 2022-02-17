import styled from "styled-components"
import StartRedCard from './StartRedCard'
import StartBlueCard from './StartBlueCard'

const StartCardBox = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 50px;
`

const StartCard = (props: any) => {
    return (
        <StartCardBox>
            <StartRedCard
                RISK={props.RISK}
                symbolBDepositedBalance={props.symbolBDepositedBalance}
                tranchBTimeout={props.tranchBTimeout}
                trancheInitTime={props.trancheInitTime}
                minVaribleToken={props.minVaribleToken}
                maxVaribleToken={props.maxVaribleToken}
                varibleTokenLimit={props.varibleTokenLimit}
                productTitle={props.productTitle}
                productEpoch={props.productEpoch}
                logoUrl={props.logoUrl}
                symbolB={props.symbolB}
                bTrancheAddress={props.bTrancheAddress}
                buyerCoinAddress={props.buyerCoinAddress}
                pid={props.pid}
                name={props.name}
            />

            <StartBlueCard 
                trancheInitTime={props.trancheInitTime}
                tranchBTimeout={props.tranchBTimeout}
            />
        </StartCardBox>
    )
}

export default StartCard
import styled from "styled-components"
import EndRedCard from './EndRedCard'
import EndBlueCard from './EndBlueCard'

const EndCardBox = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 50px;
`

const EndCard = (props: any) => {
    return (
        <EndCardBox>
            <EndRedCard 
                symbolBDepositedBalance={props.symbolBDepositedBalance}
                bTrancheAddress={props.bTrancheAddress}
                variableApy={props.variableApy}
            />

            <EndBlueCard
                RISK={props.RISK}
                fixedApy={props.fixedApy}
                trancheInitTime={props.trancheInitTime}
                gamePeriod={props.gamePeriod}
                tranchBTimeout={props.tranchBTimeout}
                aTrancheAddress={props.aTrancheAddress}
                buyerCoinAddress={props.buyerCoinAddress}
                productTitle={props.productTitle}
                productEpoch={props.productEpoch}
                logoUrl={props.logoUrl}
                pid={props.pid}
                name={props.name}
                symbolA={props.symbolA}
                lockPeriod={props.lockPeriod}
                minVaribleToken={props.minVaribleToken}
                maxVaribleToken={props.maxVaribleToken}
                symbolADepositedBalance={props.symbolADepositedBalance}
                symbolBDepositedBalance={props.symbolBDepositedBalance}
            />
        </EndCardBox>
    )
}

export default EndCard
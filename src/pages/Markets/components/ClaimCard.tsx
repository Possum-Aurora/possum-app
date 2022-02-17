import styled from "styled-components"
import ClaimRedCard from './ClaimRedCard'
import ClaimBlueCard from './ClaimBlueCard'


const ClaimCardBox = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 50px;
`

const ClaimCard = (props: any) => {
    return (
        <ClaimCardBox>
            <ClaimRedCard 
                symbolBDepositedBalance={props.symbolBDepositedBalance}
                variableApy={props.variableApy}
                pid={props.pid}
                symbolB={props.symbolB}
                bTrancheAddress={props.bTrancheAddress}
                aTrancheAddress={props.aTrancheAddress}
                name={props.name}
                productTitle={props.productTitle}
                productEpoch={props.productEpoch}
                logoUrl={props.logoUrl}
                lockPeriod={props.lockPeriod}
            />

            <ClaimBlueCard 
                symbolADepositedBalance={props.symbolADepositedBalance}
                fixedApy={props.fixedApy}
                pid={props.pid}
                symbolA={props.symbolA}
                bTrancheAddress={props.bTrancheAddress}
                aTrancheAddress={props.aTrancheAddress}
                name={props.name}
                productTitle={props.productTitle}
                productEpoch={props.productEpoch}
                logoUrl={props.logoUrl}
                lockPeriod={props.lockPeriod}
            />
        </ClaimCardBox>
    )
}

export default ClaimCard
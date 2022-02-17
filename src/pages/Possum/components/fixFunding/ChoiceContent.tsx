import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'

const ChoiceContentBox = styled.div`
    
`

const ChoiceTitle = styled.div`
    font-size: 50px;
    font-family: DINPro-Bold, DINPro;
    font-weight: bold;
    color: var(--whiteColor);
    margin-bottom: 20px;
`

const ChoiceTip = styled.div`
    font-size: 18px;
    font-family: DINPro;
    color: var(--whiteColor);
    line-height: 23px;
    padding: 5px 0;
`

const ChoiceExploreMarkets = styled.div`
    cursor: pointer;
    width: 214px;
    text-align: center;
    height: 38px;
    line-height: 38px;
    background: var(--itemContentBorderColor);
    border-radius: 8px;
    border: 1px solid var(--butBorderColor);
    font-size: 16px;
    font-family: DINPro-Medium, DINPro;
    font-weight: 500;
    color: var(--whiteColor);
    margin-top: 60px;
    &:hover {
        color: var(--itemContentBorderColor);
        background: var(--whiteColor);
    }
`

const BolckBox = styled.div`
    height: 140px;
`

const ChoiceContent = () => {
    let navigate = useNavigate()
    const exploreMarketsClick = () => {
        navigate('/markets', {state: {}, replace: true})
    }

    return (
        <ChoiceContentBox>
            <ChoiceTitle>
                <FormattedMessage id='possum.choice.title' defaultMessage="" values={{name: ''}} />
            </ChoiceTitle>

            <ChoiceTip>
                <FormattedMessage id='possum.choice.tip' defaultMessage="" values={{name: ''}} />
            </ChoiceTip>

            <ChoiceTip>
                <FormattedMessage id='possum.choice.tipp' defaultMessage="" values={{name: ''}} />
            </ChoiceTip>

            <ChoiceExploreMarkets onClick={exploreMarketsClick}>
                <FormattedMessage id='possum.choice.explore.markets' defaultMessage="" values={{name: ''}} />
            </ChoiceExploreMarkets>

            <BolckBox />
        </ChoiceContentBox>
    )
}

export default ChoiceContent
import styled from "styled-components"
import PossumDecideBgImg from 'images/PossumDecideBgImg.jpg'
import { FormattedMessage } from 'react-intl'
import ReadCard from 'components/Card/ReadCard'
import BlueCard from 'components/Card/BlueCard'

const PossumDecideBox = styled.div`
    background: url(${PossumDecideBgImg}) no-repeat;
    background-size: 100% 100%;
    padding-bottom: 50px;
`

const PossumContent = styled.div`
    margin: auto;
    width: var(--mainContentWidth);
`

const PossumDecideTitle = styled.div`
    text-align: center;
    font-size: 50px;
    font-family: DINPro-Bold, DINPro;
    font-weight: bold;
    color: var(--whiteColor);
    padding-top: 40px;
`

const CardBox = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 60px;
`

const Overview = () => {
    return (
        <PossumDecideBox>
            <PossumContent>
                <PossumDecideTitle>
                    <FormattedMessage id='possum.decide.title' defaultMessage="" values={{name: ''}} />
                </PossumDecideTitle>

                <CardBox>
                    <ReadCard title='Variable'></ReadCard>

                    <BlueCard title='Fixed'></BlueCard>
                </CardBox>
            </PossumContent>
        </PossumDecideBox>
    )
}
export default Overview
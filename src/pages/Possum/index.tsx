import styled from "styled-components"
import PossumChoice from './components/PossumChoice'
import PossumDefi from './components/PossumDefi'
import PossumDecide from './components/PossumDecide'
import Footer from 'components/Footer'

const PossumBox = styled.div`
`

const Overview = () => {
    return (
        <PossumBox>
            <PossumChoice />

            <PossumDefi />

            <PossumDecide />

            <Footer />
        </PossumBox>
    )
}
export default Overview
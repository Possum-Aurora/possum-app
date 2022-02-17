import styled from "styled-components"
import BlueBgImg from 'images/BlueBgImg.png'
import { FormattedMessage } from 'react-intl'
import FlipClock from 'x-react-flipclock'
import { timestampToTime } from 'utils/timer'

const StartBlueCardBox = styled.div`
    position: relative;
    background: url(${BlueBgImg}) no-repeat;
    background-size: 100% 100%;
    width: 525px;
    height: 676px;
    .blueCard {
        color: var(--butBorderColor);
    }
`

const CardTitle = styled.div`
    position: absolute;
    font-size: 30px;
    font-family: DINPro-Bold, DINPro;
    font-weight: bold;
    left: 50%;
    top: 55px;
    transform: translate(-50%, -50%);/*相对于自己的百分比*/
`

const StartBlueCardContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .startIn {
        font-size: 30px;
        font-family: DINPro-Bold, DINPro;
        font-weight: bold;
        color: #979FB5;
    }
`

const FlipClockBox = styled.div`
    width: 300px;
    margin-top: 40px;
`

const StartBlueCard = (props: any) => {
    return (
        <StartBlueCardBox>
            <CardTitle className="blueCard">
                <FormattedMessage id='card.title.fix' defaultMessage="" values={{name: ''}} />
            </CardTitle>

            <StartBlueCardContent>
                <div className="startIn">Start in</div>
                {/* https://www.npmjs.com/package/x-react-flipclock */}
                <FlipClockBox>
                    <FlipClock
                        type = "countdown" 
                        count_to={timestampToTime(props.trancheInitTime + props.tranchBTimeout)}
                    />
                </FlipClockBox>
                
            </StartBlueCardContent>
        </StartBlueCardBox>
    )
}

export default StartBlueCard
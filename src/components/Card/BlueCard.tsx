import styled from "styled-components"
import BlueBgImg from 'images/BlueBgImg.png'
import { FormattedMessage } from 'react-intl'
import Button from 'components/Button'
import LineChartBox from 'components/LineChart'
import { useNavigate } from 'react-router-dom'

const BlueCardBox = styled.div`
    position: relative;
    background: url(${BlueBgImg}) no-repeat;
    background-size: 100% 100%;
    width: 525px;
    height: 676px;
`

const CardTitle = styled.div`
    position: absolute;
    font-size: 30px;
    font-family: DINPro-Bold, DINPro;
    font-weight: bold;
    color: var(--butBorderColor);
    left: 50%;
    top: 55px;
    transform: translate(-50%, -50%);/*相对于自己的百分比*/
`

const CardContent = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    text-align: center;
    padding-top: 120px;
    padding-bottom: 60px;
    .Padd {
        padding: 0 80px;
    }
`

const CardContentTitle = styled.div`
    font-size: 36px;
    font-family: DINPro-Black, DINPro;
    font-weight: 900;
    color: var(--butBorderColor);
`

const CardContentItem = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    font-size: 30px;
    font-family: DINPro-Medium, DINPro;
    font-weight: 500;
    color: var(--whiteColor);
    text-align: left;
    padding: 0 70px;
    &::before {
        display: inline-block;
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 20px;
        background: linear-gradient(170deg, var(--whiteColor) 0%, var(--butBorderColor) 100%);
    }
`

const BlueCard = (props: any) => {
    let navigate = useNavigate()
    const type:string = 'PossumFixedJoinNow'
    const onButClick = (type:string) => {
        navigate('/markets', {state: {}, replace: true})
    }

    return (
       <BlueCardBox>
           <CardTitle>{props.title}</CardTitle>
           <CardContent>
                <div>
                    <CardContentTitle>Get Up to 45.6 % APY</CardContentTitle>

                    <CardContentItem>
                        <FormattedMessage id='possum.card.dynamic' defaultMessage="" values={{name: ''}} />
                    </CardContentItem>
                    <CardContentItem>
                        <FormattedMessage id='possum.card.leveraged' defaultMessage="" values={{name: ''}} />
                    </CardContentItem>
                    <CardContentItem>
                        <FormattedMessage id='possum.card.downSide' defaultMessage="" values={{name: ''}} />
                    </CardContentItem>
                </div>

                <div  className="Padd">
                    <LineChartBox type={type} />
                    <Button text='Join Now!' type={type} onButClick={(type) => onButClick(type)} />
                </div>
                
            </CardContent>
       </BlueCardBox> 
    )
}

export default BlueCard
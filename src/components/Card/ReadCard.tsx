import styled from "styled-components"
import RedBgImg from 'images/RedBgImg.png'
import { FormattedMessage } from 'react-intl'
import Button from 'components/Button'
import LineChartBox from 'components/LineChart'
import { useNavigate } from 'react-router-dom'

const ReadCardBox = styled.div`
    position: relative;
    background: url(${RedBgImg}) no-repeat;
    background-size: 100% 100%;
    width: 525px;
    height: 676px;
`

const CardTitle = styled.div`
    position: absolute;
    font-size: 30px;
    font-family: DINPro-Bold, DINPro;
    font-weight: bold;
    color: var(--redCardColor);
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
    text-align: center;
    font-size: 36px;
    font-family: DINPro-Black, DINPro;
    font-weight: 900;
    color: var(--redCardColor);
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
        background: linear-gradient(170deg, #FFDFF5 0%, var(--redCardColor) 100%);
    }
`

const ReadCard = (props: any) => {
    let navigate = useNavigate()
    const type:string = 'PossumVariableJoinNow'
    const onButClick = (type:string) => {
        navigate('/markets', {state: {}, replace: true})
    }

    return (
       <ReadCardBox>
           <CardTitle>{props.title}</CardTitle>
           <CardContent>
               <div>
                    <CardContentTitle>Get Up to 45.6 % APY</CardContentTitle>
                    <CardContentItem>
                        <FormattedMessage id='possum.card.stable' defaultMessage="" values={{name: ''}} />
                    </CardContentItem>
                    <CardContentItem>
                        <FormattedMessage id='possum.card.income' defaultMessage="" values={{name: ''}} />
                    </CardContentItem>
               </div>
                
                <div className="Padd">
                    <LineChartBox type={type} />
                    <Button text='Join Now!' type={type} onButClick={(type) => onButClick(type)} />
                </div>
            </CardContent>
       </ReadCardBox> 
    )
}

export default ReadCard
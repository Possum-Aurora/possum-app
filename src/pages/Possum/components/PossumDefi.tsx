import styled from "styled-components"
import PossumDefiBgImg from 'images/PossumDefiBgImg.jpg'
import { ArrowRightOutlined } from '@ant-design/icons'
import { FormattedMessage } from 'react-intl'

const PossumDefiBox = styled.div`
    background: url(${PossumDefiBgImg}) no-repeat;
    background-size: 100% 100%;
    height: 100vh;
`

const PossumContent = styled.div`
    margin: auto;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    width: var(--mainContentWidth);
    height: 100%;
    padding: 100px;
    p {
        font-size: 18px;
        font-family: DINPro;
        color: var(--anwserColor);
        line-height: 23px;
        margin: 0;
    }
`

const TitleContent = styled.div`
    font-size: 40px;
    font-family: DINPro-Bold, DINPro;
    font-weight: bold;
    color: #2C2F36;
`

const LoadMore = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 128px;
    height: 36px;
    padding: 0 15px;
    background: var(--whiteColor);
    border-radius: 28px;
    border: 1px solid #DAE1F5;
    font-size: 14px;
    font-family: DINPro;
    color: var(--loadMoreColor);
    margin-top: 20px;
    &:hover {
        border: 1px solid var(--loadMoreColor);
    }
`

const PossumDefi = () => {
    return (
        <PossumDefiBox>
            <PossumContent>
                <div>
                    <TitleContent>
                        <FormattedMessage id='possum.defi.what' defaultMessage="" values={{name: ''}} />
                    </TitleContent>
                    <p><FormattedMessage id='possum.defi.what.top' defaultMessage="" values={{name: ''}} /></p>
                    <p><FormattedMessage id='possum.defi.what.bottom' defaultMessage="" values={{name: ''}} /></p>
                </div>
                
                <div>
                    <TitleContent>
                        <FormattedMessage id='possum.defi.how' defaultMessage="" values={{name: ''}} />
                    </TitleContent>
                    <p><FormattedMessage id='possum.defi.how.top' defaultMessage="" values={{name: ''}} /></p>
                    <p><FormattedMessage id='possum.defi.how.bottom' defaultMessage="" values={{name: ''}} /></p>
                    <LoadMore>
                        <FormattedMessage id='possum.defi.loadmore' defaultMessage="" values={{name: ''}} />
                        <ArrowRightOutlined />
                    </LoadMore>
                </div>
                
                <div>
                    <TitleContent>
                        <FormattedMessage id='possum.defi.why' defaultMessage="" values={{name: ''}} />
                    </TitleContent>
                    <p><FormattedMessage id='possum.defi.why.top' defaultMessage="" values={{name: ''}} /></p>
                    <p><FormattedMessage id='possum.defi.why.bottom' defaultMessage="" values={{name: ''}} /></p>
                    <LoadMore>
                        <FormattedMessage id='possum.defi.loadmore' defaultMessage="" values={{name: ''}} />
                        <ArrowRightOutlined />
                    </LoadMore>
                </div>
                
            </PossumContent>
        </PossumDefiBox>
    )
}
export default PossumDefi
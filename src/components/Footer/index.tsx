import styled from "styled-components"
import { FormattedMessage } from 'react-intl'
import selTwitter from 'images/selTwitter.png'
import linkedIN from 'images/linkedIN.png'
import selLinkedIN from 'images/selLinkedIN.png'
import telegram from 'images/telegram.png'
import selTelegram from 'images/selTelegram.png'
import possumLogo from 'images/possumLogo.png'

const FooterBox = styled.div`
    width: 100%;
    height: 184px;
    background: #2C2F36;
`

const FooterContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: var(--mainContentWidth);
    margin: auto;
    height: 100%;
`

const LeftContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    height: 100%;
    justify-content: center;
    font-size: 28px;
    font-family: DINPro;
    color: var(--whiteColor);
    img {
        width: 200px;
    }
`

const RightContent = styled.div`
    display: flex;
    align-items: center;
    a {
        margin-left: 30px;
    }
    .linked:hover {
        img {
            content: url(${selLinkedIN});
        }
    }
    .telegram:hover {
        img {
            content: url(${selTelegram});
        }
    }
`

const Footer = () => {
    return (
        <FooterBox>
            <FooterContent>
                <LeftContent>
                    <img alt="LogoUSDT" src={possumLogo} />
                    <FormattedMessage id='possum.footer.tip' defaultMessage="" values={{name: ''}} />
                </LeftContent>

                <RightContent>
                    <a target='_blank' href=' '>
                        <img alt="" src={selTwitter} />
                    </a>

                    <a className="linked" target='_blank' href=' '>
                        <img alt="" src={linkedIN} />
                    </a>

                    <a className="telegram" target='_blank' href=' '>
                        <img  alt="" src={telegram} />
                    </a>
                </RightContent>
            </FooterContent>
        </FooterBox>
    )
}

export default Footer
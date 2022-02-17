import styled from "styled-components"
import SwitchWallet from "components/SwitchWallet"
import { VideoCameraOutlined, MailOutlined } from '@ant-design/icons'
import RouteLink from "../NavigationBar/routeLink"
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import selTwitter from 'images/selTwitter.png'
import linkedIN from 'images/linkedIN.png'
import selLinkedIN from 'images/selLinkedIN.png'
import telegram from 'images/telegram.png'
import selTelegram from 'images/selTelegram.png'
import possumLogo from 'images/possumLogo.png'

const HeaderFrame = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    .menuList {
        display: flex;
        align-items: center;
        height: var(--headerHg);
    }
`

const HeaderContent = styled.div`
    width: var(--menuWidth);
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: auto;
`

const HeaderRightBox = styled.div`
    display: flex;
    align-items: center;
    .PossumLogo {
        width: 150px;
    }
`

const MenuFrame = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 253px;
    height: 40px;
    background: var(--headerMenuBgColor);
    border-radius: 40px;
    margin-left: 40px;
`

const SwitchBox = styled.div`
    display: flex;
    align-items: center;
    a {
        margin-right: 30px;
        img {
            width: 30px;
        }
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

const Header = (props: any) => {
    const location: any = useLocation()
    let defaultSelectedKeys = location.pathname
    if (defaultSelectedKeys === '/detail') {
        defaultSelectedKeys = '/markets'
    }
    const menuList = [
        { 
            to: '/markets',
            key: '/markets',
            normalIcon: MailOutlined, 
            activeIcon: VideoCameraOutlined,
            isShowIcon: false,
            title: 'menu.markets',
            childrens: []
        },
        { 
            to: '/portfolio',
            key: '/portfolio',
            normalIcon: MailOutlined, 
            activeIcon: VideoCameraOutlined,
            isShowIcon: false,
            title: 'menu.portfolio',
            childrens: []
        }
    ]
    
    return (
        <HeaderFrame>
            <HeaderContent>
                <HeaderRightBox>
                    <Link to='/possum'>
                        <img className="PossumLogo" alt="possumLogo" src={possumLogo} />
                    </Link>

                    <MenuFrame>
                        {
                            menuList.map((item:any) => {
                                return (
                                    <RouteLink
                                        key={item.key}
                                        defaultSelectedKeys={defaultSelectedKeys}
                                        defaultKey={item.key}
                                        to={item.to}
                                        normalIcon={item.normalIcon}
                                        activeIcon={item.activeIcon}
                                        title={item.title}
                                    />
                                )
                            })
                        }
                    </MenuFrame>
                </HeaderRightBox>          
                
                <SwitchBox>
                    <a target='_blank' href=' '>
                        <img alt="" src={selTwitter} />
                    </a>

                    <a className="linked" target='_blank' href=' '>
                        <img alt="" src={linkedIN} />
                    </a>

                    <a className="telegram" target='_blank' href=' '>
                        <img  alt="" src={telegram} />
                    </a>
                    <SwitchWallet />
                </SwitchBox>
            </HeaderContent>
        </HeaderFrame>
    )
}
export default Header
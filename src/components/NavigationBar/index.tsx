import styled from "styled-components"
import { VideoCameraOutlined, MailOutlined } from '@ant-design/icons'
import SwitchTheme from 'components/SwitchTheme'
import RouteLink from "./routeLink"
import { Layout, Menu } from 'antd'
import { useLocation } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
const { Sider } = Layout
const { SubMenu } = Menu

const NavLogo = styled.div`
    height: var(--headerHg);
    background: var(--menuBgColor);
`

const NavigationBar = (props:any) => {
    const location:any = useLocation()
    const defaultSelectedKeys = location.pathname
    const menuList = [
        { 
            to: '/overview',
            key: '/overview',
            normalIcon: MailOutlined, 
            activeIcon: VideoCameraOutlined,
            title: 'menu.dashboard',
            childrens: []
        },
        { 
            to: '/trade',
            key: '/trade',
            normalIcon: MailOutlined, 
            activeIcon: VideoCameraOutlined,
            title: 'menu.trade',
            childrens: []
        },
        { 
            to: '/shorting',
            key: '/shorting',
            normalIcon: MailOutlined, 
            activeIcon: VideoCameraOutlined,
            title: 'menu.shorting',
            childrens: []
        },
        { 
            to: '/earn',
            key: '/earn',
            normalIcon: MailOutlined, 
            activeIcon: VideoCameraOutlined,
            title: 'menu.earn',
            childrens: []
        },
        { 
            to: '/wallet',
            key: '/wallet',
            normalIcon: MailOutlined, 
            activeIcon: SwitchTheme,
            title: 'menu.wallet',
            childrens: []
        },
        { 
            to: '/mint',
            key: '',
            normalIcon: MailOutlined, 
            activeIcon: VideoCameraOutlined,
            title: 'menu.mint',
            childrens: [
                {
                    to: '/mint',
                    key: '/mint',
                    normalIcon: VideoCameraOutlined, 
                    activeIcon: MailOutlined,
                    title: 'menu.mint',
                }
            ]
        },
    ]

    return (
        <Sider trigger={null} >
            <NavLogo></NavLogo>

            <Menu mode="inline" defaultSelectedKeys={defaultSelectedKeys}>
                {
                    menuList.map((item:any) => {
                        return (
                            item.childrens.length > 0
                            ?
                            <SubMenu key={item.key} icon={<item.normalIcon />} 
                                title={
                                    <FormattedMessage id={item.title} defaultMessage="" values={{name: ''}} />
                                }>
                                {
                                    item.childrens.map((childItem:any) => {
                                        return (
                                            <Menu.Item key={childItem.key}>
                                                <RouteLink
                                                    defaultSelectedKeys={defaultSelectedKeys}
                                                    defaultKey={childItem.key}
                                                    to={childItem.to}
                                                    normalIcon={childItem.normalIcon}
                                                    activeIcon={childItem.activeIcon}
                                                    title={childItem.title}
                                                />
                                            </Menu.Item>
                                        )
                                    })
                                }
                            </SubMenu>
                            :
                            <Menu.Item key={item.key}>
                                <RouteLink
                                    defaultSelectedKeys={defaultSelectedKeys}
                                    defaultKey={item.key}
                                    to={item.to}
                                    normalIcon={item.normalIcon}
                                    activeIcon={item.activeIcon}
                                    title={item.title}
                                />
                            </Menu.Item>
                        )
                    })
                }
            </Menu>
        </Sider>
    )
}
export default NavigationBar
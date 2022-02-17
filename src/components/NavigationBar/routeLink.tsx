import { Link } from 'react-router-dom'
import Icon from '@ant-design/icons'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

const LinkClass = styled.div`
    display: flex;
    align-items: center;
    .navLabel {
        color: var(--menuBgColor);
        font-size: 18px;
        font-weight: 500;
    }
    &:hover {
        opacity: .7;
    }

    .active {
        color: var(--butBorderColor);
        width: 100px;
        text-align: center;
        line-height: 30px;
        height: 30px;
        background: #1F2127;
        border-radius: 27px;
    }
`

const RouteLink = (props:any) => {
    return (
        <Link to={props.to}>
            <LinkClass>
                {
                    props.isShowIcon
                    ?
                    <Icon component={
                            props.defaultSelectedKeys === props.defaultKey ? props.activeIcon : props.normalIcon
                        }
                    /> 
                    :
                    ''
                }
                
                <span className={`navLabel ${props.defaultSelectedKeys === props.defaultKey ? 'active' : ''}`}>
                    <FormattedMessage id={props.title} defaultMessage="" values={{name: ''}} />
                </span>
            </LinkClass>
        </Link>
    )
}

export default RouteLink
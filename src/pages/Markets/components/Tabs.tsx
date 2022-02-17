import styled from "styled-components"
import { FormattedMessage } from 'react-intl'

const TabsBox = styled.div`
    display: flex;
    align-items: center;
    width: 352px;
    height: 53px;
    background: var(--headerBg);
    border-radius: 27px;
    padding: 0 15px;
    .active {
        background: var(--fixedRateColor);
        border-radius: 22px;
        color: var(--butBorderColor);
    }
`

const TabItem = styled.div`
    cursor: pointer;
    width: 110px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-size: 16px;
    font-family: DINPro-Medium, DINPro;
    font-weight: 500;
    color: var(--whiteColor);
    &:hover {
        border: 1px solid var(--butBorderColor);
        border-radius: 22px;
        color: var(--butBorderColor);
    }
`

const Tabs = (props:any) => {

    const tabItemClick = (type:string) => {
        props.tabItemClick(type)
    }

    return (
        <TabsBox>
            <TabItem className={props.currentActive === 'funding' ? 'active' : ''} onClick={() => tabItemClick('funding')}>
                <FormattedMessage id='markets.funding' defaultMessage="" values={{name: ''}} />
            </TabItem>
            <TabItem className={props.currentActive === 'live' ? 'active' : ''} onClick={() => tabItemClick('live')}>
                <FormattedMessage id='markets.live' defaultMessage="" values={{name: ''}} />
            </TabItem>
            <TabItem className={props.currentActive === 'closed' ? 'active' : ''} onClick={() => tabItemClick('closed')}>
                <FormattedMessage id='markets.closed' defaultMessage="" values={{name: ''}} />
            </TabItem>
        </TabsBox> 
    ) 
}

export default  Tabs
import styled from "styled-components"
import { FormattedMessage } from 'react-intl'
import { useState } from 'react'

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
    const [currentActive, setCurrentActive] = useState('Funding')

    const tabItemClick = (type:string) => {
        setCurrentActive(type)
        props.tabItemClick(type)
    }

    return (
        <TabsBox>
            <TabItem className={currentActive === 'Funding' ? 'active' : ''} onClick={() => tabItemClick('Funding')}>
                <FormattedMessage id='portfolio.funding' defaultMessage="" values={{name: ''}} />
            </TabItem>
            <TabItem className={currentActive === 'Running' ? 'active' : ''} onClick={() => tabItemClick('Running')}>
                <FormattedMessage id='portfolio.running' defaultMessage="" values={{name: ''}} />
            </TabItem>
            <TabItem className={currentActive === 'Claimming' ? 'active' : ''} onClick={() => tabItemClick('Claimming')}>
                <FormattedMessage id='portfolio.claimming' defaultMessage="" values={{name: ''}} />
            </TabItem>
        </TabsBox> 
    ) 
}

export default  Tabs
import styled from "styled-components"
import { useState, useEffect } from "react"

const SwitchThemeBox = styled.div`
    cursor: pointer;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 3px;
    border-radius: 5px;
    border: 1px solid yellow;
    .icon {
        fill: #fff;
        width: 22px;
        height: 22px;
    }
`

const SwitchTheme = (props: any) => {
    const [themeType, setThemeType] = useState("")

    useEffect(()=> {
        init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const init = () => {
        let localThemeType:string = localStorage.getItem('themeType') || 'sun'
        setThemeTypeClick(localThemeType)
    }

    const setThemeTypeClick = (type:string) => {
        const document:any = window.document
        if (type === 'sun') {
            document.head.querySelector('#skin').setAttribute('href', `/theme/sun.css`)
        } else {
            document.head.querySelector('#skin').setAttribute('href', `/theme/month.css`)
        }
        localStorage.setItem('themeType', type)
        setThemeType(type)
    }

    return (
        <SwitchThemeBox>
            {/* className={["icon",  ].join(' ')} */}
            {
                themeType === 'sun' ? 
                    <svg className="icon" aria-hidden="true" onClick={ () => setThemeTypeClick('month') }>
                        <use xlinkHref="#icon-Daytimemode"></use>
                    </svg>
                    :
                    <svg className="icon" aria-hidden="true" onClick={ () => setThemeTypeClick('sun') }>
                        <use xlinkHref="#icon-cc-month"></use>
                    </svg>     
            }
        </SwitchThemeBox>
    )
}
export default SwitchTheme
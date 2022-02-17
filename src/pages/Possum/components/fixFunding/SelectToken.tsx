import styled from "styled-components"
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import { useState, useEffect, useRef } from 'react'
import { Skeleton } from 'antd'
import { useOnClickOutside } from 'hooks/useOnClickOutside'

const SelectTokenBox = styled.div`
    position: relative;
    width: 385px;
    margin-top: 30px;
`

const SelectTokenContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    background: #E1E1E1;
    border-radius: 8px;
    padding: 0 20px;
    cursor: pointer;
    .left {
        display: flex;
        align-items: center;
        .logo {
            width: 32px;
            margin-right: 10px;
        }
        span {
            font-size: 16px;
            font-family: DINPro;
            color: #1F2127;
        }
        .sortName {
            font-size:12px;
            margin-left: 5px;
        }
    }
    &:hover {
        opacity: .8;
    }
`

const SelectTokenModal = styled.div`
    position: absolute;
    width: 100%;
    padding: 10px;
    background: var(--whiteColor);
    top: 60px;
    border-radius: 8px;
`

const TokenItem = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    .logo {
        width: 32px;
        margin-right: 10px;
    }
    span {
        font-size: 16px;
        font-family: DINPro;
        color: #1F2127;
    }
    &:hover {
        border: 1px solid var(--butBorderColor);
        border-radius: 4px;
        span {
            color: var(--butBorderColor);
        }
    }
`

const SelectToken = (props:any) => {
    const ref = useRef(null)
    const earningsPoolList = props.earningsPoolList
    const [showModal, setShowModal] = useState(false)
    const [currentToken, setCurrentToken] = useState('')
    const [currentTokenLogo, setCurrentTokenLogo] = useState('')
    const [symbolA, setSymbolA] = useState('')
    const [symbolB, setSymbolB] = useState('')

    useEffect(() => {
        const initData = () => {
            setCurrentToken(earningsPoolList[0].name)
            setCurrentTokenLogo(earningsPoolList[0].logoUrl)
            setSymbolA(earningsPoolList[0].symbolA)
            setSymbolB(earningsPoolList[0].symbolB)
        }
        if (earningsPoolList && earningsPoolList.length) {
            initData()
        }
    }, [earningsPoolList])

    useOnClickOutside(ref, () => setShowModal(false))

    const showModalClick = () => {
        setShowModal(!showModal)
    }

    const tokenItemClick = (item:any) => {
        setShowModal(false)
        setCurrentToken(item.name)
        setCurrentTokenLogo(item.logoUrl)
        setSymbolA(item.symbolA)
        setSymbolB(item.symbolB)
        props.selectTokenClick(item)
    }

    return (
        <SelectTokenBox ref={ref} id="modal">
            <SelectTokenContent onClick={showModalClick}>
                {
                    props.isLoadComplete ?
                        <div className="left">
                            <img className="logo" alt="LogoUSDT" src={currentTokenLogo} />
                            <span>{currentToken}</span>
                            <span className="sortName">{`(${symbolA}/${symbolB})`}</span>
                        </div>
                    :
                        <Skeleton active paragraph={{ rows: 0 }} />
                }
                
                {
                    showModal ? 
                    <CaretUpOutlined />
                    :
                    <CaretDownOutlined />
                }
            </SelectTokenContent>

            {
                showModal ? 
                    <SelectTokenModal>
                        {
                            earningsPoolList.length && earningsPoolList.map((item: any, index: number) => {
                                return (
                                    <TokenItem onClick={() => tokenItemClick(item)} key={index}>
                                        <img className="logo" alt="LogoUSDT" src={item.logoUrl} />
                                        <span>{item.name}</span>
                                    </TokenItem>
                                )
                            })
                        }
                    </SelectTokenModal>
                :
                    ''
            }
        </SelectTokenBox>
    )
}

export default SelectToken
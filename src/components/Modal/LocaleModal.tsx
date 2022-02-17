
import styled from "styled-components"
import { Modal } from "antd"
import { useImperativeHandle, useState } from "react"
import languageList from "../../i18n/languageList"
import { selectLanguageHandler } from "../../store/dispatch"

const ModalBox = styled.div`
    box-sizing: border-box;
`

const LocaleItem = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e5e5e5;
    &:hover {
        opacity: .5;
    }
`

const ItemCountries = styled.div`
    font-size: 32px;
`

const ItemLanguage = styled.div`
    font-size: 22px;
`

const LocaleModal = (props:any) => {
    const [visible, setVisible] = useState(props.visible)

    useImperativeHandle(props.onRef, () => ({
        // onChild 就是暴露给父组件的方法
        updateData ({visible = false}) {
            setVisible(visible)
        }
    }))

    const handleOk = () => {
        setVisible(false)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    const selectLanguageItemClick = (item: any) => {
        selectLanguageHandler(item.localeType)
        setVisible(false)
    }

    return (
        <Modal
            title="Select the language"
            visible={visible}
            onOk={handleOk} 
            onCancel={handleCancel}
            footer={null}
        >
            <ModalBox>
                {
                    languageList.map((item:any, index:number) => {
                        return (
                            <LocaleItem onClick={() => selectLanguageItemClick(item)} key={index}>
                                <ItemCountries>{item.countries}</ItemCountries>
                                <ItemLanguage>{item.language}</ItemLanguage>
                            </LocaleItem>
                        )
                    })
                } 
            </ModalBox>
        </Modal>
    )
}
export default LocaleModal
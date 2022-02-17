import zh_CN from '../../i18n/zh_CN'
import en_US from '../../i18n/en_US'

const locale = (state: '', action:any) => {
    if (action.type === 'SEL_LANGUAGE') {
        let locale = zh_CN
        let localeType = action.localeType
        switch (localeType) {
            case 'zh_CN':
                locale = zh_CN
                break

            case 'en_US':
                locale = en_US
            break

            default:
                break
        }
        return locale
    } else {
        return zh_CN
    }
}
export default locale
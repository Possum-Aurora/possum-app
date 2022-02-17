import store from "../index"

// To switch between languages
export const selectLanguageHandler = (localeType: '') => {
    store.dispatch({
        type: 'SEL_LANGUAGE',
        localeType
    })
}
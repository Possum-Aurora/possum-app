import { createReducer } from '@reduxjs/toolkit'
import { selectLanguageHandler } from './actions'
import zh_CN from '../../i18n/zh_CN'
import en_US from '../../i18n/en_US'

const initialState = {
	localeState: en_US
}

export default createReducer(initialState, (builder) => {
	builder
		.addCase(selectLanguageHandler, (state, { payload: { localeType } }) => {
            switch (localeType) {
                case 'zh_CN':
                    state.localeState = zh_CN
                    break
    
                case 'en_US':
                    state.localeState = en_US
                break
    
                default:
                    state.localeState = en_US
                    break
            }
			
		})
})
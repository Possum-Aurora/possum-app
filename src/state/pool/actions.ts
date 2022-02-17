import { createAction } from '@reduxjs/toolkit'
import { PoolData } from 'state/types'

// fired once when the app reloads but before the app renders
// allows any updates to be applied to store data loaded from localStorage
export const setPoolListHander = createAction<{poolList: PoolData[]}>('local/selectLanguageHandler')

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { save, load } from 'redux-localstorage-simple'
import { updateVersion } from './global/actions'
import multicall from './multicall/reducer'
import application from './block/reducer'
import locale from './locale/reducer'
import pool from './pool/reducer'
import transactions from './transactions/reducer'

const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists']

const rootReducer = combineReducers({
    multicall,
    application,
    locale,
    pool,
    transactions
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}), // [...getDefaultMiddleware({ thunk: false }), save({ states: PERSISTED_KEYS, debounce: 1000 })]
  preloadedState: load({ states: PERSISTED_KEYS }),
})

store.dispatch(updateVersion())

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
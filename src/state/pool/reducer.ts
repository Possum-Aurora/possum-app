import { createReducer } from '@reduxjs/toolkit'
import { setPoolListHander } from './actions'
import { PoolDateState } from 'state/types'

const initialState: PoolDateState = {
	poolList: [],
	isLoadSuccess: false,
}

export default createReducer(initialState, (builder) => {
	builder
		.addCase(setPoolListHander, (state, { payload: { poolList} }) => {
            state.poolList = poolList
			state.isLoadSuccess = true
		})
})
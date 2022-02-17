import { createReducer, nanoid } from '@reduxjs/toolkit'
import { updateBlockNumber, setOpenModal, setTxHash } from './actions'

export interface ApplicationState {
  readonly blockNumber: { readonly [chainId: number]: number }
  openModal: boolean,
  hash: string
}

const initialState: ApplicationState = {
  blockNumber: {},
  openModal: true,
  hash: ''
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateBlockNumber, (state, action) => {
      const { chainId, blockNumber } = action.payload
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId])
      }
    })

    .addCase(setOpenModal, (state, {payload: { openModal }}) => {
      state.openModal = openModal
    })

    .addCase(setTxHash, (state, {payload: { hash }}) => {
      state.hash = hash
    })
)

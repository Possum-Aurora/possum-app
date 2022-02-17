import { createAction } from '@reduxjs/toolkit'

export const updateBlockNumber = createAction<{ chainId: number; blockNumber: number }>('application/updateBlockNumber')
export const setOpenModal = createAction<{openModal: boolean}>('application/setOpenModal')
export const setTxHash = createAction<{hash: string}>('application/setTxHash')

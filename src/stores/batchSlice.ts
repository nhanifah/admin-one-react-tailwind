import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const styleSlice = createSlice({
  name: 'modal',
  initialState: {
    modal: false,
  },
  reducers: {
    showModal: (state, action: PayloadAction<null>) => {
      state.modal = true
    },
    closeModal: (state, action: PayloadAction<null>) => {
      state.modal = false
    },
  },
})

export const { showModal, closeModal } = styleSlice.actions

export default styleSlice.reducer

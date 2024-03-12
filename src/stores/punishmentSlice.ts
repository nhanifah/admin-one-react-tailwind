import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
  modal: boolean
}

const initialState: ModalState = {
  modal: false,
}

export const styleSlice = createSlice({
  name: 'punishment',
  initialState,
  reducers: {
    showPunishmentModal: (state) => {
      state.modal = true
    },
    closePunishmentModal: (state) => {
      state.modal = false
    },
  },
})

export const { showPunishmentModal, closePunishmentModal } = styleSlice.actions

export default styleSlice.reducer

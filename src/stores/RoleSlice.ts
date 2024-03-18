import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  modal: false,
  updateModal: false,
  selectedRoleId: '',
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    showModal: (state) => {
      state.modal = true
    },
    closeModal: (state) => {
      state.modal = false
    },
    showUpdateModal: (state) => {
      state.updateModal = true
    },
    closeUpdateModal: (state) => {
      state.updateModal = false
    },
    setSelectedRoleId: (state, action: PayloadAction<string>) => {
      state.selectedRoleId = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { showModal, closeModal, setSelectedRoleId, showUpdateModal, closeUpdateModal } =
  mainSlice.actions

export default mainSlice.reducer

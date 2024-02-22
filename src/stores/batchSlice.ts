import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const styleSlice = createSlice({
  name: 'modal',
  initialState: {
    modal: false,
    modalStudents: true,
    batch_selected: '',
  },
  reducers: {
    showModal: (state, action: PayloadAction<null>) => {
      state.modal = true
    },
    closeModal: (state, action: PayloadAction<null>) => {
      state.modal = false
    },
    showModalStudents: (state, action: PayloadAction<null>) => {
      state.modalStudents = true
    },
    closeModalStudents: (state, action: PayloadAction<null>) => {
      state.modalStudents = false
    },
    selectBatch: (state, action: PayloadAction<string>) => {
      state.batch_selected = action.payload
    },
  },
})

export const { showModal, closeModal, showModalStudents, closeModalStudents, selectBatch } =
  styleSlice.actions

export default styleSlice.reducer

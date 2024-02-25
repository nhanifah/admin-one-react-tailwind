import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BatchStudents } from '../interfaces'

const batch_selected: BatchStudents = {
  id: '',
  batch_name: '',
  quota: 0,
  end_date: '',
  students: [],
}

export const styleSlice = createSlice({
  name: 'modal',
  initialState: {
    modal: false,
    modalStudents: false,
    batch_selected,
    students_selected: [],
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
    selectBatch: (state, action: PayloadAction<BatchStudents>) => {
      state.batch_selected = action.payload
    },
    setStudentsSelected: (state, action: PayloadAction<string[]>) => {
      state.students_selected = action.payload
    },
  },
})

export const {
  showModal,
  closeModal,
  showModalStudents,
  closeModalStudents,
  selectBatch,
  setStudentsSelected,
} = styleSlice.actions

export default styleSlice.reducer

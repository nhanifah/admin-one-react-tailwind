import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Students } from '../interfaces'

type initialState = {
  modal: boolean
  studentData: Students[]
}

const initialState: initialState = {
  modal: false,
  studentData: [],
}

export const styleSlice = createSlice({
  name: 'option',
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<boolean>) => {
        state.modal = action.payload
        },
    setStudentData: (state, action: PayloadAction<Students[]>) => {
        state.studentData = action.payload
        },
  },
})

export const { showModal, setStudentData } = styleSlice.actions

export default styleSlice.reducer

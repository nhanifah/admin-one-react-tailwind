import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Students, InterviewSchedules } from '../interfaces'

const interviewSchedules: InterviewSchedules = {
  id: '',
  interview_date: '',
  interview_location: '',
  students: [],
}

const students: Students[] = []

const initialState = {
  interviewSchedules,
  students,
  broadcastModal: false,
}

export const styleSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    setInterviewSchedules: (state, action: PayloadAction<InterviewSchedules>) => {
      state.interviewSchedules = action.payload
    },
    setStudents: (state, action: PayloadAction<Students[]>) => {
      state.students = action.payload
    },
    showBroadcastModal: (state) => {
      state.broadcastModal = true
    },
    closeBroadcastModal: (state) => {
      state.broadcastModal = false
    },
  },
})

export const { setInterviewSchedules, setStudents, showBroadcastModal, closeBroadcastModal } =
  styleSlice.actions

export default styleSlice.reducer

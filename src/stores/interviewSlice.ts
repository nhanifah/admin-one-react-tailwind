import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Students, InterviewSchedules } from '../interfaces'

const interviewSchedules: InterviewSchedules = {
  id: '',
  batch_id: '',
  interview_date: '',
  interview_location: '',
  students: [],
}

const students: Students[] = []

const initialState = {
  interviewSchedules,
  students,
  broadcastModal: false,
  updateModal: false,
  progressModal: false,
  addModal: false,
  editModal: false,
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
    showUpdateModal: (state) => {
      state.updateModal = true
    },
    closeUpdateModal: (state) => {
      state.updateModal = false
    },
    showProgressModal: (state) => {
      state.progressModal = true
    },
    closeProgressModal: (state) => {
      state.progressModal = false
    },
    showAddModal: (state) => {
      state.addModal = true
    },
    closeAddModal: (state) => {
      state.addModal = false
    },
    showEditModal: (state) => {
      state.editModal = true
    },
    closeEditModal: (state) => {
      state.editModal = false
    },
  },
})

export const {
  setInterviewSchedules,
  setStudents,
  showBroadcastModal,
  closeBroadcastModal,
  showUpdateModal,
  closeUpdateModal,
  showProgressModal,
  closeProgressModal,
  showAddModal,
  closeAddModal,
  showEditModal,
  closeEditModal,
} = styleSlice.actions

export default styleSlice.reducer

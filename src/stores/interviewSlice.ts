import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Students, InterviewSchedules } from '../interfaces'
import { boolean } from 'zod'

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
  contractModal: false,
  interviewId: '',
  checkAll: false,
  studentsId: <string[]>[],
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
    showContractModal: (state) => {
      state.contractModal = true
    },
    closeContractModal: (state) => {
      state.contractModal = false
    },
    setInterviewId: (state, action: PayloadAction<any>) => {
      state.interviewId = action.payload
    },
    setCheckAll: (state, action: PayloadAction<boolean>) => {
      state.checkAll = action.payload
    },
    addStudentId: (state, action: PayloadAction<any>) => {
      state.studentsId.push(action.payload)
    },
    popStudentId: (state, action: PayloadAction<any>) => {
      const index = state.studentsId.indexOf(action.payload)
      state.studentsId.splice(index, 1)
    },
    resetStudentId: (state) => {
      state.studentsId = []
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
  showContractModal,
  closeContractModal,
  setInterviewId,
  setCheckAll,
  addStudentId,
  popStudentId,
  resetStudentId,
} = styleSlice.actions

export default styleSlice.reducer

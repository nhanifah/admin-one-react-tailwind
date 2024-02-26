import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BatchStudents, Students } from '../interfaces'

const batch_selected: BatchStudents = {
  id: '',
  batch_name: '',
  quota: 0,
  end_date: '',
  students: [],
}

const students_selected: Students[] = []

const student: Students = {
  id: '',
  full_name: '',
  whatsapp_number: '',
  email: '',
  nik: '',
  province: '',
  city: '',
  subdistrict: '',
  village: '',
  address_detail: '',
  batch_id: '',
  interview_schedule: '',
  dormitory: '',
  guardian_name: '',
  guardian_phone: '',
  progress: '',
  created_at: new Date(),
  updated_at: new Date(),
  checked: false,
  batch_registration: {
    id: '',
    batch_name: '',
  },
  master_referral: {
    id: '',
    referral_name: '',
  },
  student_attachments: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filter: '',
    id: '',
    file_name: '',
    file_url: '',
  },
}

export const styleSlice = createSlice({
  name: 'modal',
  initialState: {
    modal: false,
    modalStudents: false,
    batch_selected,
    students_selected,
    studentDetailModal: false,
    student,
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
    closeModalStudents: (state) => {
      state.modalStudents = false
    },
    selectBatch: (state, action: PayloadAction<BatchStudents>) => {
      state.batch_selected = action.payload
    },
    setStudentsSelected: (state, action: PayloadAction<Students[]>) => {
      state.students_selected = action.payload
    },

    showStudentDetailModal: (state) => {
      state.studentDetailModal = true
    },
    closeStudentDetailModal: (state) => {
      state.studentDetailModal = false
    },
    setStudent: (state, action: PayloadAction<Students>) => {
      state.student = action.payload
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
  showStudentDetailModal,
  closeStudentDetailModal,
  setStudent,
} = styleSlice.actions

export default styleSlice.reducer

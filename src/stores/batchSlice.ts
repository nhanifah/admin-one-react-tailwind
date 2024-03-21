import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BatchStudents, Students, User } from '../interfaces'

const selectedStudentsId = <string[]>[]

const batch_selected: BatchStudents = {
  id: '',
  batch_name: '',
  quota: 0,
  end_date: '',
  students: [],
}

const user: User = {
  id: '',
  name: '',
  username: '',
  email: '',
  master_roles: {
    id: '',
    name: '',
    access: [],
    created_at: new Date(),
    updated_at: new Date(),
  },
  created_at: new Date(),
  updated_at: new Date(),
  password: '',
  role: '',
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
  student_punishments: [],
  interview: {
    id: '',
    interview_date: '',
    batch_id: '',
    interview_location: '',
    students: [],
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
    studentEditModal: false,
    userDetailModal: false,
    student,
    user,
    editModal: false,
    selectedStudentsId,
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

    showStudentEditModal: (state) => {
      state.studentEditModal = true
    },
    closeStudentEditModal: (state) => {
      state.studentEditModal = false
    },
    showStudentDetailModal: (state) => {
      state.studentDetailModal = true
    },
    closeStudentDetailModal: (state) => {
      state.studentDetailModal = false
    },
    showUserDetailModal: (state) => {
      state.userDetailModal = true
    },
    closeUserDetailModal: (state) => {
      state.userDetailModal = false
    },
    setStudent: (state, action: PayloadAction<Students>) => {
      state.student = action.payload
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    showEditModal: (state) => {
      state.editModal = true
    },
    closeEditModal: (state) => {
      state.editModal = false
    },
    addStudentId: (state, action: PayloadAction<any>) => {
      state.selectedStudentsId.push(action.payload)
    },
    popStudentId: (state, action: PayloadAction<any>) => {
      const index = state.selectedStudentsId.indexOf(action.payload)
      state.selectedStudentsId.splice(index, 1)
    },
    resetStudentId: (state) => {
      state.selectedStudentsId = []
    },
  },
})

export const {
  showModal,
  closeModal,
  showModalStudents,
  closeModalStudents,
  showStudentEditModal,
  closeStudentEditModal,
  selectBatch,
  setStudentsSelected,
  showStudentDetailModal,
  closeStudentDetailModal,
  showUserDetailModal,
  closeUserDetailModal,
  setStudent,
  setUser,
  showEditModal,
  closeEditModal,
  addStudentId,
  popStudentId,
  resetStudentId,
} = styleSlice.actions

export default styleSlice.reducer

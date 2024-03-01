import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface initialState {
  uploadModal: boolean
  contractModal: boolean
  contractFiles: any
}

const initialState: initialState = {
  uploadModal: false,
  contractModal: false,
  contractFiles: null,
}

export const styleSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    showUploadModal: (state) => {
      state.uploadModal = true
    },
    closeUploadModal: (state) => {
      state.uploadModal = false
    },
    showContractModal: (state) => {
      state.contractModal = true
    },
    closeContractModal: (state) => {
      state.contractModal = false
    },
    setContractFiles: (state, action: PayloadAction<any>) => {
      state.contractFiles = action.payload
    },
  },
})

export const {
  showUploadModal,
  closeUploadModal,
  showContractModal,
  closeContractModal,
  setContractFiles,
} = styleSlice.actions

export default styleSlice.reducer

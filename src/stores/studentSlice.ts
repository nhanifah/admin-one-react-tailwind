import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface initialState {
  uploadModal: boolean
  contractModal: boolean
  contractFiles: any
  paymentModal: boolean
  installmentId: string
  transkripModal: boolean
  transkripFiles: any
  uploadTranskripModal: boolean
}

const initialState: initialState = {
  uploadModal: false,
  contractModal: false,
  contractFiles: null,
  paymentModal: false,
  installmentId: '',
  transkripModal: false,
  transkripFiles: null,
  uploadTranskripModal: false,
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
    showPaymentModal: (state) => {
      state.paymentModal = true
    },
    closePaymentModal: (state) => {
      state.paymentModal = false
    },
    setInstallmentId: (state, action: PayloadAction<string>) => {
      state.installmentId = action.payload
    },
    showTraskripModal: (state) => {
      state.transkripModal = true
    },
    closeTraskripModal: (state) => {
      state.transkripModal = false
    },
    setTranskripFiles: (state, action: PayloadAction<any>) => {
      state.transkripFiles = action.payload
    },
    showUploadTranksripModal: (state) => {
      state.uploadTranskripModal = true
    },
    closeUploadTranskripModal: (state) => {
      state.uploadTranskripModal = false
    },
  },
})

export const {
  showUploadModal,
  closeUploadModal,
  showContractModal,
  closeContractModal,
  setContractFiles,
  showPaymentModal,
  closePaymentModal,
  setInstallmentId,
  showTraskripModal,
  closeTraskripModal,
  setTranskripFiles,
  showUploadTranksripModal,
  closeUploadTranskripModal,
} = styleSlice.actions

export default styleSlice.reducer

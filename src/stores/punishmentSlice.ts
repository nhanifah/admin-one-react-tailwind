import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
  modal: boolean
  punishmentListModal: boolean
  uploadModal: boolean
  viewerModal: boolean
  type: string
  punishmentAttachment: any
}

const initialState: ModalState = {
  modal: false,
  punishmentListModal: false,
  uploadModal: false,
  viewerModal: false,
  type: '',
  punishmentAttachment: null,
}

export const styleSlice = createSlice({
  name: 'punishment',
  initialState,
  reducers: {
    showPunishmentModal: (state) => {
      state.modal = true
    },
    closePunishmentModal: (state) => {
      state.modal = false
    },
    showPunishmentListModal: (state) => {
      state.punishmentListModal = true
    },
    closePunishmentListModal: (state) => {
      state.punishmentListModal = false
    },
    showUploadModal: (state) => {
      state.uploadModal = true
    },
    closeUploadModal: (state) => {
      state.uploadModal = false
    },
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload
    },
    setPunishmentAttachment: (state, action: PayloadAction<any>) => {
      state.punishmentAttachment = action.payload
    },
    showViewerModal: (state) => {
      state.viewerModal = true
    },
    closeViewerModal: (state) => {
      state.viewerModal = false
    },
  },
})

export const {
  showPunishmentModal,
  closePunishmentModal,
  showPunishmentListModal,
  closePunishmentListModal,
  showUploadModal,
  closeUploadModal,
  setType,
  setPunishmentAttachment,
  showViewerModal,
  closeViewerModal,
} = styleSlice.actions

export default styleSlice.reducer

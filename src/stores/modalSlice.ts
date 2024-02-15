import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
  isModalActive: boolean
}

const initialState: ModalState = {
  isModalActive: false,
}

export const styleSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIsModalActive: (state, action: PayloadAction<boolean | null>) => {
      state.isModalActive = action.payload
    },
  },
})

export const { setIsModalActive } = styleSlice.actions

export default styleSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
  option: string[]
}

const initialState: ModalState = {
  option: [],
}

export const styleSlice = createSlice({
  name: 'option',
  initialState,
  reducers: {
    addOption: (state, action: PayloadAction<string>) => {
      state.option.push(action.payload)
    },
    popOption: (state, action: PayloadAction<number>) => {
      state.option.splice(action.payload, 1)
    },
    resetOption: (state) => {
      state.option = []
    },
  },
})

export const { addOption, popOption, resetOption } = styleSlice.actions

export default styleSlice.reducer

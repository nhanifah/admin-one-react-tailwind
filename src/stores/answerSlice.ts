import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const styleSlice = createSlice({
  name: 'answer',
  initialState: {
    answerList: [],
    studentName: '',
    studentId: '',
  },
  reducers: {
    resetAnswer: (state, action: PayloadAction) => {
      state.answerList = []
    },

    setAnswer: (state, action: PayloadAction<object[]>) => {
      state.answerList = action.payload
    },

    setChecked: (state, action: PayloadAction) => {
      state.answerList = state.answerList.map((item) => {
        if (item.id == action.payload) {
          return {
            ...item,
            checked: true,
          }
        }
        return item
      })
    },

    setUnchecked: (state, action: PayloadAction) => {
      state.answerList = state.answerList.map((item) => {
        if (item.id == action.payload) {
          return {
            ...item,
            checked: false,
          }
        }
        return item
      })
    },

    setStudentName: (state, action: PayloadAction<string>) => {
      state.studentName = action.payload
    },

    setStudentId: (state, action: PayloadAction<any>) => {
      state.studentId = action.payload
    },
  },
})

export const { resetAnswer, setAnswer, setChecked, setUnchecked, setStudentName, setStudentId } =
  styleSlice.actions

export default styleSlice.reducer

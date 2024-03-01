import { configureStore } from '@reduxjs/toolkit'
import darkModeReducer from './darkModeSlice'
import mainReducer from './mainSlice'
import modalReducer from './modalSlice'
import optionReducer from './optionSlice'
import answerReducer from './answerSlice'
import batchReducer from './batchSlice'
import interviewReducer from './interviewSlice'
import affiliateReducer from './affiliateSlice'
import studentReducer from './studentSlice'

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    main: mainReducer,
    modal: modalReducer,
    option: optionReducer,
    answer: answerReducer,
    batch: batchReducer,
    interview: interviewReducer,
    affiliate: affiliateReducer,
    student: studentReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

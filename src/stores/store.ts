import { configureStore } from '@reduxjs/toolkit'
import darkModeReducer from './darkModeSlice'
import mainReducer from './mainSlice'
import modalReducer from './modalSlice'
import optionReducer from './optionSlice'

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    main: mainReducer,
    modal: modalReducer,
    option: optionReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

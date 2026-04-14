import { configureStore } from '@reduxjs/toolkit'
import auth from './auth/authSlice'
import profile from './profile/profileSlice'
export const store = configureStore({
  reducer: {auth , profile},
})

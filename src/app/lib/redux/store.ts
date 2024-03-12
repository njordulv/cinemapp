import { configureStore } from '@reduxjs/toolkit'
import movieReducer from '@/redux/slices/movieSlice'

export const reduxStore = configureStore({
  reducer: {
    movie: movieReducer,
  },
})

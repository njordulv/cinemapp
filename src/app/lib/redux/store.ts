import { configureStore } from '@reduxjs/toolkit'
import movieReducer from '@/redux/slices/movieSlice'
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
} from 'react-redux'

export const reduxStore = configureStore({
  reducer: {
    movie: movieReducer,
  },
})

export const useDispatch = () => useReduxDispatch()
export const useSelector = useReduxSelector

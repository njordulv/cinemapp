import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
} from 'react-redux'
import authReducer from '@/redux/slices/authSlice'

const rootReducer = combineReducers({
  auth: authReducer,
})

export const reduxStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof reduxStore.dispatch

export const useDispatch = () => useReduxDispatch()
export const useSelector = useReduxSelector

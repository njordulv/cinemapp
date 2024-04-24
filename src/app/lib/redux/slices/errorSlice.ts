import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/redux/store'

const initialState: string | null = null

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action) => {
      return action.payload
    },
    clearError: () => {
      return initialState
    },
  },
})

export const { setError, clearError } = errorSlice.actions

export const selectErrorMessage = (state: RootState) => state.error

export default errorSlice.reducer

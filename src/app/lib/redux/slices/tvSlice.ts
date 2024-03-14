import { createSlice } from '@reduxjs/toolkit'
import SingleMovieData from '@/types/SingleMovieData'

interface TVState {
  currentTV: SingleMovieData | null
}

const initialState: TVState = {
  currentTV: null,
}

const tvSlice = createSlice({
  name: 'tv',
  initialState,
  reducers: {
    setTV: (state, action) => {
      state.currentTV = action.payload
    },
  },
})

export const { setTV } = tvSlice.actions

export const selectTV = (state: { tv: TVState }) => state.tv.currentTV

export default tvSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import TopRatedData from '@/types/TopRatedData'

interface TopRatedState {
  currentMovie: TopRatedData | null
}

const initialState: TopRatedState = {
  currentMovie: null,
}

const topRatedSlice = createSlice({
  name: 'topRated',
  initialState,
  reducers: {
    setTopRated: (state, action) => {
      state.currentMovie = action.payload
    },
  },
})

export const { setTopRated } = topRatedSlice.actions

export const selectTopRated = (state: { topRated: TopRatedState }) =>
  state.topRated.currentMovie

export default topRatedSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { Single } from '@/types/data'

interface MovieState {
  currentMovie: Single | null
}

const initialState: MovieState = {
  currentMovie: null,
}

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovie: (state, action) => {
      state.currentMovie = action.payload
    },
  },
})

export const { setMovie } = movieSlice.actions

export const selectMovie = (state: { movie: MovieState }) =>
  state.movie.currentMovie

export default movieSlice.reducer

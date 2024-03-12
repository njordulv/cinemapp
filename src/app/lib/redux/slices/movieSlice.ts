import { createSlice } from '@reduxjs/toolkit'
import SingleMovieData from '@/types/SingleMovieData'

interface MovieState {
  currentMovie: SingleMovieData | null
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

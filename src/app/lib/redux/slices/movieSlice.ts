import { createSlice } from '@reduxjs/toolkit'

interface MovieState {
  movie: null
}

const initialState: MovieState = {
  movie: null,
}

const movieSlice = createSlice({
  name: 'movieData',
  initialState,
  reducers: {
    setMovie: (state, action) => {
      state.movie = action.payload
    },
  },
})

export const { setMovie } = movieSlice.actions

export const selectMovie = (state: { movieData: MovieState }) =>
  state.movieData.movie

export default movieSlice.reducer

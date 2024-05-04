import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/redux/store'

interface UserState {
  email: string | null
  token: string | null
  id: string | null
  createdAt: null
  name: string | null
  photoURL: string | null
  watchlist: number[]
}

const initialState: UserState = {
  email: null,
  token: null,
  id: null,
  createdAt: null,
  name: null,
  photoURL: null,
  watchlist: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email
      state.token = action.payload.token
      state.id = action.payload.id
      state.createdAt = action.payload.createdAt
      state.name = action.payload.name
      state.photoURL = action.payload.photoURL
    },
    setAvatar(state, action) {
      state.photoURL = action.payload
    },
    setUserName(state, action) {
      state.name = action.payload
    },
    addTowatchlist: (state, action: PayloadAction<number>) => {
      if (Array.isArray(state.watchlist)) {
        state.watchlist = [...state.watchlist, action.payload]
      } else {
        state.watchlist = [action.payload]
      }
    },
    removeFromwatchlist: (state, action: PayloadAction<number>) => {
      if (Array.isArray(state.watchlist)) {
        state.watchlist = state.watchlist.filter((id) => id !== action.payload)
      } else {
        state.watchlist = []
      }
    },
    updatewatchlist: (state, action: PayloadAction<number[]>) => {
      state.watchlist = action.payload
    },
    logoutUser(state) {
      state.email = null
      state.token = null
      state.id = null
      state.createdAt = null
      state.name = null
      state.photoURL = null
      state.watchlist = []
    },
    removeAvatar(state) {
      state.photoURL = null
    },
  },
})

export const {
  setUser,
  logoutUser,
  setAvatar,
  removeAvatar,
  setUserName,
  addTowatchlist,
  removeFromwatchlist,
  updatewatchlist,
} = userSlice.actions
export const selectUserName = (state: RootState) => state.user.name
export const selectwatchlist = (state: RootState) => state.user.watchlist || []

export default userSlice.reducer

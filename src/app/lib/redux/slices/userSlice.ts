import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { RootState } from '@/redux/store'

interface ListItem {
  id: number
  type: 'movie' | 'tv'
}

interface UserState {
  email: string | null
  token: string | null
  id: string | null
  createdAt: null
  name: string | null
  photoURL: string | null
  watchlist: ListItem[]
  favorites: ListItem[]
}

const initialState: UserState = {
  email: null,
  token: null,
  id: null,
  createdAt: null,
  name: null,
  photoURL: null,
  watchlist: [],
  favorites: [],
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
    addToWatchlist: (
      state,
      action: PayloadAction<{ id: number; type: 'movie' | 'tv' }>
    ) => {
      state.watchlist.push(action.payload)
    },
    removeFromWatchlist: (
      state,
      action: PayloadAction<{ id: number; type: 'movie' | 'tv' }>
    ) => {
      state.watchlist = state.watchlist.filter(
        (item) =>
          item.id !== action.payload.id || item.type !== action.payload.type
      )
    },
    updateWatchlist: (
      state,
      action: PayloadAction<{ id: number; type: 'movie' | 'tv' }[]>
    ) => {
      state.watchlist = action.payload
    },
    addToFavorites: (
      state,
      action: PayloadAction<{ id: number; type: 'movie' | 'tv' }>
    ) => {
      state.favorites.push(action.payload)
    },
    removeFromFavorites: (
      state,
      action: PayloadAction<{ id: number; type: 'movie' | 'tv' }>
    ) => {
      state.favorites = state.favorites.filter(
        (item) =>
          item.id !== action.payload.id || item.type !== action.payload.type
      )
    },
    updateFavorites: (
      state,
      action: PayloadAction<{ id: number; type: 'movie' | 'tv' }[]>
    ) => {
      state.favorites = action.payload
    },
    logoutUser(state) {
      state.email = null
      state.token = null
      state.id = null
      state.createdAt = null
      state.name = null
      state.photoURL = null
      state.watchlist = []
      state.favorites = []
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
  addToWatchlist,
  removeFromWatchlist,
  updateWatchlist,
  addToFavorites,
  removeFromFavorites,
  updateFavorites,
} = userSlice.actions
export const selectUserName = (state: RootState) => state.user.name

const selectFavoritesData = (state: RootState) => state.user.favorites
export const selectFavorites = createSelector(
  selectFavoritesData,
  (favorites) => favorites.map(({ id, type }) => ({ id, type }))
)

const selectWatchlistData = (state: RootState) => state.user.watchlist
export const selectWatchlist = createSelector(
  selectWatchlistData,
  (watchlist) => watchlist.map(({ id, type }) => ({ id, type }))
)

export default userSlice.reducer

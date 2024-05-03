import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/redux/store'

interface UserState {
  email: string | null
  token: string | null
  id: string | null
  createdAt: null
  name: string | null
  photoURL: string | null
  accentColor: string | null
}

const initialState: UserState = {
  email: null,
  token: null,
  id: null,
  createdAt: null,
  name: null,
  photoURL: null,
  accentColor: null,
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
      state.accentColor = action.payload.accentColor
    },
    setAvatar(state, action) {
      state.photoURL = action.payload
    },
    setUserName(state, action) {
      state.name = action.payload
    },
    setAccentColor(state, action) {
      state.accentColor = action.payload
    },
    removeUser(state) {
      state.email = null
      state.token = null
      state.id = null
      state.createdAt = null
      state.name = null
      state.photoURL = null
      state.accentColor = null
    },
    removeAvatar(state) {
      state.photoURL = null
    },
  },
})

export const {
  setUser,
  removeUser,
  setAvatar,
  removeAvatar,
  setUserName,
  setAccentColor,
} = userSlice.actions
export const selectUserName = (state: RootState) => state.user.name
export const selectAccentColor = (state: RootState) => state.user.accentColor

export default userSlice.reducer

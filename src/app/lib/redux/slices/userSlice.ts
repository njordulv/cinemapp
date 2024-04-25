import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  email: string | null
  token: string | null
  id: string | null
  createdAt: null
  name: string | null
  avatarUrl: string | null
}

const initialState: UserState = {
  email: null,
  token: null,
  id: null,
  createdAt: null,
  name: null,
  avatarUrl: null,
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
      state.avatarUrl = action.payload.avatarUrl
    },
    setAvatar(state, action) {
      state.avatarUrl = action.payload
    },
    removeUser(state) {
      state.email = null
      state.token = null
      state.id = null
      state.createdAt = null
      state.name = null
      state.avatarUrl = null
    },
    removeAvatar(state) {
      state.avatarUrl = null
    },
  },
})

export const { setUser, removeUser, setAvatar, removeAvatar } =
  userSlice.actions

export default userSlice.reducer

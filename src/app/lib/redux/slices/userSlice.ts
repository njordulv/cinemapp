import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/redux/store'

interface UserState {
  email: string | null
  token: string | null
  id: string | null
  createdAt: null
  name: string | null
  photoURL: string | null
}

const initialState: UserState = {
  email: null,
  token: null,
  id: null,
  createdAt: null,
  name: null,
  photoURL: null,
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
    removeUser(state) {
      state.email = null
      state.token = null
      state.id = null
      state.createdAt = null
      state.name = null
      state.photoURL = null
    },
    removeAvatar(state) {
      state.photoURL = null
    },
  },
})

export const { setUser, removeUser, setAvatar, removeAvatar } =
  userSlice.actions
export const selectUserName = (state: RootState) => state.user.name

export default userSlice.reducer

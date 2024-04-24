import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/redux/store'

interface AvatarState {
  avatarUrl: string | null
}

const initialState: AvatarState = {
  avatarUrl: null,
}

const avatarSlice = createSlice({
  name: 'avatar',
  initialState,
  reducers: {
    setAvatar(state, action) {
      state.avatarUrl = action.payload
    },
    removeAvatar(state) {
      state.avatarUrl = null
    },
  },
})

export const { setAvatar, removeAvatar } = avatarSlice.actions
export const selectAvatar = (state: RootState) => state.avatar

export default avatarSlice.reducer

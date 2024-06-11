import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/redux/store'

interface MenuState {
  isOpen: boolean
}

const initialState: MenuState = {
  isOpen: false,
}

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setIsMenuOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload
    },
  },
})

export const { setIsMenuOpen } = menuSlice.actions

export const menuSelector = (state: RootState) => state.menu.isOpen

export default menuSlice.reducer

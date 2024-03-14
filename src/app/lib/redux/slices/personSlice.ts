import { createSlice } from '@reduxjs/toolkit'
import PersonData from '@/types/PersonData'

interface PersonState {
  currentPerson: PersonData | null
}

const initialState: PersonState = {
  currentPerson: null,
}

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    setPerson: (state, action) => {
      state.currentPerson = action.payload
    },
  },
})

export const { setPerson } = personSlice.actions

export const selectPerson = (state: { person: PersonState }) =>
  state.person.currentPerson

export default personSlice.reducer

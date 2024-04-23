// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { RootState } from '@/redux/store'
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   updateProfile,
//   onAuthStateChanged,
//   User,
// } from 'firebase/auth'
// import { auth } from '@/config/firebase'

// export interface UserState {
//   user: User | null
//   isLoading: boolean
// }

// const initialState: UserState = {
//   user: null,
//   isLoading: true,
// }

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<User | null>) => {
//       state.user = action.payload
//       state.isLoading = false
//     },
//     setLoading: (state, action: PayloadAction<boolean>) => {
//       state.isLoading = action.payload
//     },
//   },
// })

// export const signUp =
//   (email: string, password: string, name: string) => async (dispatch: any) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       )
//       if (userCredential.user) {
//         await updateProfile(userCredential.user, { displayName: name })
//         dispatch(setUser(userCredential.user))
//       }
//     } catch (error) {
//       throw error
//     }
//   }

// export const logIn =
//   (email: string, password: string) => async (dispatch: any) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       )
//       if (userCredential.user) {
//         dispatch(setUser(userCredential.user))
//       }
//     } catch (error) {
//       throw error
//     }
//   }

// export const logOut = () => async (dispatch: any) => {
//   try {
//     await signOut(auth)
//     dispatch(setUser(null))
//   } catch (error) {
//     throw error
//   }
// }

// export const initializeAuth = () => (dispatch: any) => {
//   const unsubscribe = onAuthStateChanged(auth, (user) => {
//     dispatch(setUser(user))
//   })

//   return unsubscribe
// }

// export const { setUser, setLoading } = authSlice.actions

// export const selectUser = (state: RootState) => state.auth.user
// export const selectLoading = (state: RootState) => state.auth.isLoading

// export default authSlice.reducer

'use client'

import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { auth } from '@/config/firebase'
import {
  setUser,
  updateWatchlist,
  updateFavorites,
} from '@/redux/slices/userSlice'
import { selectErrorMessage, setError } from '@/redux/slices/errorSlice'
import Form from '@/components/User/Form'

const Login = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const error = useAppSelector(selectErrorMessage)

  const handleLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        const userId = auth.currentUser?.uid
        let avatar = null
        let name = null
        let watchlist = []
        let favorites = []

        if (userId) {
          try {
            const firestore = getFirestore()
            const userDocRef = doc(firestore, 'users', userId)
            const userSnapshot = await getDoc(userDocRef)

            if (userSnapshot.exists()) {
              const userData = userSnapshot.data()
              avatar = userData.photoURL || null
              name = userData.name || null
              watchlist = userData.watchlist || []
              favorites = userData.favorites || []
            } else {
              console.warn('User document does not exist in Firestore')
            }
          } catch (error) {
            console.error('Error fetching avatar URL:', error)
          }
        }

        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
            createdAt: user.metadata.creationTime,
            name,
            photoURL: avatar,
          })
        )
        dispatch(updateWatchlist(watchlist))
        dispatch(updateFavorites(favorites))

        router.push('/dashboard')
      })
      .catch((error) => {
        const errorMessage = error.message || 'An error occurred during login.'
        dispatch(setError(errorMessage))
      })
  }

  return <Form title="Log In" error={error} handleClick={handleLogin} />
}

export default Login

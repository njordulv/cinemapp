'use client'

import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { auth } from '@/config/firebase'
import { setUser } from '@/redux/slices/userSlice'
import { selectErrorMessage, setError } from '@/redux/slices/errorSlice'
import Form from '@/components/User/Form'

const getAvatarUrl = async (userId: string): Promise<string | undefined> => {
  try {
    const firestore = getFirestore()
    const userDocRef = doc(firestore, 'users', userId)
    const userDoc = await getDoc(userDocRef)

    if (userDoc.exists() && userDoc.data()?.avatarURL) {
      return userDoc.data()?.avatarURL
    } else {
      return undefined
    }
  } catch (error) {
    throw error
  }
}

const Login = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const error = useAppSelector(selectErrorMessage)

  const handleLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        let avatarUrl
        const userId = auth.currentUser?.uid

        if (userId) {
          try {
            avatarUrl = await getAvatarUrl(userId)
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
            name: user.displayName,
            avatarUrl,
          })
        )

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

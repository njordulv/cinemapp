'use client'

import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { setUser } from '@/redux/slices/userSlice'
import { selectErrorMessage, setError } from '@/redux/slices/errorSlice'
import { auth } from '@/config/firebase'
import Form from '@/components/User/Form'

const Login = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const error = useAppSelector(selectErrorMessage)

  const handleLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
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

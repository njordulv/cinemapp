'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { setUser } from '@/redux/slices/userSlice'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { auth } from '@/config/firebase'
import Form from './Form'

const Login = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [error, setError] = useState('')

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
        setError(errorMessage)
      })
  }

  return <Form title="Log In" error={error} handleClick={handleLogin} />
}

export default Login

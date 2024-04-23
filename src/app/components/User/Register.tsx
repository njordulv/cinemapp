'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setUser } from '@/redux/slices/userSlice'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { auth } from '@/config/firebase'
import Form from '@/components/User/Form'

const Register = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [error, setError] = useState('')

  const handleRegister = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
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
        const errorMessage =
          error.message || 'An error occurred during register.'
        setError(errorMessage)
      })
  }

  return <Form title="Register" error={error} handleClick={handleRegister} />
}

export default Register

'use client'

import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { setUser } from '@/redux/slices/userSlice'
import { selectErrorMessage, setError } from '@/redux/slices/errorSlice'
import { auth } from '@/config/firebase'
import Form from '@/components/User/Form'

const Register = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const error = useAppSelector(selectErrorMessage)

  const handleRegister = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
            createdAt: user.metadata.creationTime,
            name: user.displayName,
          })
        )
        router.push('/dashboard')
      })
      .catch((error) => {
        const errorMessage =
          error.message || 'An error occurred during register.'
        dispatch(setError(errorMessage))
      })
  }

  return <Form title="Register" error={error} handleClick={handleRegister} />
}

export default Register

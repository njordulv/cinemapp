'use client'

import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { auth } from '@/config/firebase'
import { setUser } from '@/redux/slices/userSlice'
import { selectErrorMessage, setError } from '@/redux/slices/errorSlice'
import Form from '@/components/User/Form'

const Register = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const error = useAppSelector(selectErrorMessage)

  const handleRegister = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      const firestore = getFirestore()
      const userDocRef = doc(firestore, 'users', user.uid)

      await setDoc(userDocRef, {
        email: user.email,
        createdAt: user.metadata.creationTime,
      })

      dispatch(
        setUser({
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
          createdAt: user.metadata.creationTime,
        })
      )

      router.push('/dashboard')
    } catch (error: any) {
      const errorMessage =
        error.message || 'An error occurred during registration.'
      dispatch(setError(errorMessage))
    }
  }

  return <Form title="Register" error={error} handleClick={handleRegister} />
}

export default Register

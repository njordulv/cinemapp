'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '@/config/firebase'

interface UserType {
  email: string | null
  uid: string | null
  name?: string | null
  creationTime?: string | null
}

const AuthContext = createContext({})

export const useAuth = () => useContext<any>(AuthContext)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>({
    email: null,
    uid: null,
    name: null,
    creationTime: null,
  })
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const creationTime = user.metadata.creationTime
        setUser({
          email: user.email,
          uid: user.uid,
          name: user.displayName,
          creationTime: creationTime,
        })
      } else {
        setUser({ email: null, uid: null, name: null, creationTime: null })
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name,
        })
        setUser({
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          name: name,
        })
      }
    } catch (error) {
      throw error
    }
  }

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logOut = async () => {
    setUser({ email: null, uid: null, name: null })
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}

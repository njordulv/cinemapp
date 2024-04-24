'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { removeUser } from '@/redux/slices/userSlice'
import React from 'react'

const Dashboard = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { isAuth, email } = useAuth()

  useEffect(() => {
    if (!isAuth) {
      router.replace('/login')
    }
  }, [isAuth, router])

  return isAuth ? (
    <main className="flex flex-col items-center place-content-center min-h-96 w-full max-w-[1170px] m-auto px-4 py-10 gap-5">
      <h1>Welcome</h1>

      <button onClick={() => dispatch(removeUser())}>
        Log out from {email}
      </button>
    </main>
  ) : null
}

export default Dashboard

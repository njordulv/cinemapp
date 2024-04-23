'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { removeUser } from '@/redux/slices/userSlice'
import React from 'react'

const Dashboard = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { isAuth, email } = useAuth()

  React.useEffect(() => {
    if (!isAuth) {
      router.replace('/login')
    }
  }, [isAuth, router])

  return isAuth ? (
    <div>
      <h1>Welcome</h1>

      <button onClick={() => dispatch(removeUser())}>
        Log out from {email}
      </button>
    </div>
  ) : null
}

export default Dashboard

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import UserHero from '@/components/User/UserHero'

const Dashboard = () => {
  const router = useRouter()
  const { isAuth } = useAuth()

  useEffect(() => {
    if (!isAuth) {
      router.replace('/login')
    }
  }, [isAuth, router])

  return isAuth ? (
    <>
      <UserHero />
    </>
  ) : null
}

export default Dashboard

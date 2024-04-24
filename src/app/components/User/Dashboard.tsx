'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import UserHero from '@/components/User/UserHero'
import ChangeAvatar from '@/components/User/ChangeAvatar'

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
      <main className="flex flex-col items-center place-content-center w-full max-w-[1170px] m-auto px-4 py-10 gap-5">
        <ChangeAvatar />
      </main>
    </>
  ) : null
}

export default Dashboard

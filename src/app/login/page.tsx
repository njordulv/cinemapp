'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import Login from '@/components/User/Login'
import { Link } from '@nextui-org/react'

const LoginPage = () => {
  const router = useRouter()
  const { isAuth } = useAuth()
  return !isAuth ? (
    <main className="flex flex-col items-center place-content-center min-h-96 h-[calc(100vh_-_65px)] w-full max-w-[1170px] m-auto px-4 py-10 gap-5">
      <Login />
      <div className="text-medium">
        Or <Link href="/register">Register</Link>
      </div>
    </main>
  ) : (
    router.push('/dashboard')
  )
}

export default LoginPage

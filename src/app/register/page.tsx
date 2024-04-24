'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import Register from '@/components/User/Register'
import { Link } from '@nextui-org/react'

const RegisterPage = () => {
  const router = useRouter()
  const { isAuth } = useAuth()
  return !isAuth ? (
    <main className="flex flex-col items-center place-content-center min-h-96 h-[calc(100vh_-_65px)] w-full max-w-[1170px] m-auto px-4 py-10 gap-5">
      <Register />
      <div className="text-medium">
        Already have an account? <Link href="/login">Sign in</Link>
      </div>
    </main>
  ) : (
    router.push('/dashboard')
  )
}

export default RegisterPage

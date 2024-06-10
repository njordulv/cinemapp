'use client'

import useAuthRedirect from '@/hooks/useAuthRedirect'
import Login from '@/components/User/Login'
import { Link } from '@nextui-org/react'

export default function LoginPage() {
  useAuthRedirect('/dashboard', true)

  return (
    <main className="flex flex-col items-center place-content-center w-full max-w-[1170px] m-auto px-4 py-10 gap-5">
      <Login />
      <div className="text-medium">
        Or <Link href="/register">Register</Link>
      </div>
    </main>
  )
}

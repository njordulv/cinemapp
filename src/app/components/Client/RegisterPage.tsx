'use client'

import useAuthRedirect from '@/hooks/useAuthRedirect'
import Register from '@/components/User/Register'
import { Link } from '@nextui-org/react'

export default function RegisterPage() {
  useAuthRedirect('/dashboard', true)

  return (
    <main className="flex flex-col items-center place-content-center w-full max-w-[1170px] m-auto px-4 py-10 gap-5">
      <Register />
      <div className="text-medium">
        Already have an account? <Link href="/login">Sign in</Link>
      </div>
    </main>
  )
}

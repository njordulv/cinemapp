import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

const useAuthRedirect = (redirect: string, isAuthenticated: boolean) => {
  const router = useRouter()
  const { isAuth } = useAuth()

  useEffect(() => {
    if (isAuth === isAuthenticated) {
      router.push(redirect)
    }
  }, [isAuth, router, redirect, isAuthenticated])

  return isAuth
}

export default useAuthRedirect

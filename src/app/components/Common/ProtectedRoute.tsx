import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

type Props = {
  children: ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user.uid) {
      router.push('/login')
    }
  }, [router, user])

  return <div>{user ? children : null}</div>
}

export default ProtectedRoute

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
    if (!user.uid || Object.keys(user.uid).length === 0) {
      router.push('/login')
    }
  }, [router, user])

  return <div>{user.uid ? children : null}</div>
}

export default ProtectedRoute

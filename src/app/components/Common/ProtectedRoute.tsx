import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Loader from '@/components/UI/Loader'

type Props = {
  children: ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user?.uid) {
      router.push('/login')
    }
  }, [router, user, loading])

  if (loading) return <Loader />

  return <div>{children}</div>
}

export default ProtectedRoute

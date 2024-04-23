import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch, AppDispatch } from '@/redux/store'
import {
  initializeAuth,
  selectUser,
  selectLoading,
} from '@/redux/slices/authSlice'
import Loader from '@/components/UI/Loader'

type Props = {
  children: ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const dispatch: AppDispatch = useDispatch()
  const router = useRouter()
  const user = useSelector(selectUser)
  const loading = useSelector(selectLoading)

  useEffect(() => {
    const unsubscribe = dispatch(initializeAuth())

    if (!loading && !user) {
      router.push('/login')
    }

    return unsubscribe
  }, [router, user, loading, dispatch])

  if (loading) return <Loader />

  return <div>{children}</div>
}

export default ProtectedRoute

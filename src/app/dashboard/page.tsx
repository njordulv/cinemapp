'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import Dashboard from '@/components/User/Dashboard'

const DashboardPage = () => {
  const router = useRouter()
  const { isAuth } = useAuth()

  return isAuth ? <Dashboard /> : router.push('/login')
}

export default DashboardPage

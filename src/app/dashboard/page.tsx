'use client'

import useAuthRedirect from '@/hooks/useAuthRedirect'
import UserProfile from '@/src/app/components/User/UserProfile'

const DashboardPage = () => {
  useAuthRedirect('/login', false)

  return <UserProfile />
}

export default DashboardPage

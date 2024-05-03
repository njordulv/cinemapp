'use client'

import useAuthRedirect from '@/hooks/useAuthRedirect'
import UserProfile from '@/components/User/UserProfile'

export default function DashboardPage() {
  useAuthRedirect('/login', false)

  return <UserProfile />
}

'use client'

import useAuthRedirect from '@/hooks/useAuthRedirect'
import UserProfile from '@/src/app/components/User/UserProfile'

export default async function DashboardPage() {
  useAuthRedirect('/login', false)

  return <UserProfile />
}

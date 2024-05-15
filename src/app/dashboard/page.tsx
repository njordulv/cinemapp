import { Metadata } from 'next'
import DashboardPage from '@/components/Client/DashboardPage'

export const metadata: Metadata = {
  title: 'My Account - CinemApp',
  description: 'An Application for Movie Enthusiasts',
}

export default async function Page() {
  return <DashboardPage />
}

import { Metadata } from 'next'
import LoginPage from '@/components/Client/LoginPage'

export const metadata: Metadata = {
  title: 'Login - CinemApp',
  description: 'An Application for Movie Enthusiasts',
}

export default async function Page() {
  return <LoginPage />
}

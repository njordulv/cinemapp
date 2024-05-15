import { Metadata } from 'next'
import RegisterPage from '@/components/Client/RegisterPage'

export const metadata: Metadata = {
  title: 'Register - CinemApp',
  description: 'An Application for Movie Enthusiasts',
}

export default async function Page() {
  return <RegisterPage />
}

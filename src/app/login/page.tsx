import Login from '@/components/User/Login'
import { Link } from '@nextui-org/react'

const LoginPage = () => {
  return (
    <>
      <Login />
      <p>
        Or <Link href="/register">register</Link>
      </p>
    </>
  )
}

export default LoginPage

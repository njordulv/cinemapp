import Login from '@/components/User/Login'
import { Link } from '@nextui-org/react'

const LoginPage = () => {
  return (
    <main className="flex flex-col items-center place-content-center min-h-96 h-[100vh] w-full max-w-[1170px] m-auto px-4 py-10 gap-5">
      <Login />
      <div className="text-medium">
        or <Link href="/register">register</Link>
      </div>
    </main>
  )
}

export default LoginPage

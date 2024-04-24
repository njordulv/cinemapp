import Register from '@/components/User/Register'
import { Link } from '@nextui-org/react'

const RegisterPage = () => {
  return (
    <main className="flex flex-col items-center place-content-center min-h-96 h-[100vh] w-full max-w-[1170px] m-auto px-4 py-10 gap-5">
      <Register />
      <div className="text-medium">
        Already have an account? <Link href="/login">Sign in</Link>
      </div>
    </main>
  )
}

export default RegisterPage

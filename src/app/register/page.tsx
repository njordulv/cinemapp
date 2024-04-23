import Register from '@/components/User/Register'
import { Link } from '@nextui-org/react'

const RegisterPage = () => {
  return (
    <>
      <Register />
      <p>
        Already have an account? <Link href="/login">Sign in</Link>
      </p>
    </>
  )
}

export default RegisterPage

'use client'

import { Input, Card, CardBody, Button, Link } from '@nextui-org/react'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

interface LoginType {
  email: string
  password: string
}
const LoginPage = () => {
  const methods = useForm<LoginType>({ mode: 'onBlur' })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const { logIn } = useAuth()
  const router = useRouter()

  const onSubmit = async (data: LoginType) => {
    try {
      await logIn(data.email, data.password)
      router.push('/dashboard')
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <main className="flex flex-col items-center place-content-center min-h-96 w-full max-w-[1170px] m-auto px-4 py-10 gap-5">
      <div className="flex flex-col w-full items-center">
        <Card className="max-w-full w-[380px] p-0 bg-transparent" shadow="none">
          <CardBody className="overflow-hidden p-0">
            <h1 className="flex self-start font-medium text-3xl mb-5">Login</h1>
            <FormProvider {...methods}>
              <form
                action=""
                className="flex flex-col gap-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="relative">
                  <Input
                    size="sm"
                    radius="md"
                    variant="bordered"
                    type="email"
                    label="Email"
                    classNames={{
                      inputWrapper: 'border-1',
                      helperWrapper: 'absolute bottom-[-22px]',
                    }}
                    errorMessage={errors.email && errors.email.message}
                    {...register('email', { required: 'Email is required' })}
                  />
                </div>
                <div className="relative">
                  <Input
                    size="sm"
                    radius="md"
                    variant="bordered"
                    type="password"
                    label="Password"
                    classNames={{
                      inputWrapper: 'border-1',
                      helperWrapper: 'absolute bottom-[-22px]',
                    }}
                    errorMessage={errors.password && errors.password.message}
                    {...register('password', {
                      required: 'Password is required',
                    })}
                  />
                </div>
                <p className="text-center text-small">
                  Need to create an account?{' '}
                  <Link size="sm" href="/signup">
                    Sign up
                  </Link>
                </p>
                <div>
                  <Button fullWidth color="primary" type="submit" size="lg">
                    Submit
                  </Button>
                </div>
              </form>
            </FormProvider>
          </CardBody>
        </Card>
      </div>
    </main>
  )
}

export default LoginPage

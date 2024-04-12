'use client'

import { useState } from 'react'
import { Input, Card, CardBody, Button, Link } from '@nextui-org/react'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

interface SignupType {
  email: string
  password: string
  name: string
}
const SignupPage = () => {
  const methods = useForm<SignupType>({ mode: 'onBlur' })
  const [isError, setIsError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const { signUp } = useAuth()
  const router = useRouter()

  const onSubmit = async (data: SignupType) => {
    try {
      await signUp(data.email, data.password)
      router.push('/dashboard')
    } catch (error: any) {
      let errorMessage = 'Failed to create your account. Please try again.'
      if (error.code === 'auth/email-already-in-use') {
        errorMessage =
          'This email address is already in use. Please use a different email address.'
      } else if (error.code === 'auth/weak-password') {
        errorMessage =
          'The password is too weak. Please use a stronger password.'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage =
          'The email address is not valid. Please check your email address and try again.'
      }

      setIsError(errorMessage)
    }
  }

  return (
    <main className="flex flex-col items-center place-content-center min-h-96 w-full max-w-[1170px] m-auto px-4 py-10 gap-5">
      <div className="flex flex-col w-full items-center">
        <Card className="max-w-full w-[380px] p-0 bg-transparent" shadow="none">
          <CardBody className="overflow-hidden p-0">
            <h1 className="flex self-start font-medium text-3xl mb-5">
              Sign Up
            </h1>
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
                    type="text"
                    label="Name"
                    classNames={{
                      inputWrapper: 'border-1',
                      helperWrapper: 'absolute bottom-[-22px]',
                    }}
                    errorMessage={errors.name && errors.name.message}
                    {...register('name')}
                  />
                </div>
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
                <div className="flex gap-1 flex-col relative">
                  <Input
                    size="sm"
                    radius="md"
                    variant="bordered"
                    label="Password"
                    type="password"
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
                  Already have an account?{' '}
                  <Link size="sm" href="/login">
                    Login
                  </Link>
                </p>
                <div>
                  <Button fullWidth color="primary" type="submit" size="lg">
                    Submit
                  </Button>
                </div>
                <p className="text-center text-small">{isError}</p>
              </form>
            </FormProvider>
          </CardBody>
        </Card>
      </div>
    </main>
  )
}

export default SignupPage

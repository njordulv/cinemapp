'use client'

import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Input, Card, CardBody, Button, Link } from '@nextui-org/react'
import { useAuth } from '@/context/AuthContext'
import {
  patternEmail,
  patternPass,
  emailValidation,
  passValidation,
} from '@/utils/authValidation'
import { useInputValidation } from '@/hooks/useInputValidation'
import styles from '@/styles/authForm.module.scss'

interface LoginType {
  email: string
  password: string
}

const LoginPage = () => {
  const { logIn } = useAuth()
  const router = useRouter()
  const [isError, setIsError] = useState('')
  const methods = useForm<LoginType>({ mode: 'onBlur' })
  const { register, handleSubmit } = methods

  const { error: emailError, handleInputChange: handleEmailChange } =
    useInputValidation({
      pattern: patternEmail,
      message: 'Invalid email format',
    })

  const { error: passwordError, handleInputChange: handlePassChange } =
    useInputValidation({
      pattern: patternPass,
      message: 'Password must include at least one letter and one number',
    })

  const onSubmit = async (data: LoginType) => {
    try {
      await logIn(data.email, data.password)
      router.push('/dashboard')
      setIsError('')
    } catch (error: any) {
      setIsError('Login failed: Incorrect email or password.')
    }
  }

  return (
    <main className={styles.authForm}>
      <div className={styles.authForm__container}>
        <Card className={`${styles.authForm__card} max-w-full w-[380px]`}>
          <CardBody className={styles.authForm__cardBody}>
            <h1 className={styles.authForm__title}>Login</h1>
            <FormProvider {...methods}>
              <form
                action=""
                className={styles.authForm__form}
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className={styles.authForm__inputContainer}>
                  <Input
                    size="sm"
                    radius="md"
                    variant="bordered"
                    type="email"
                    label="Email"
                    classNames={{
                      inputWrapper:
                        'border-1 border-default-200 data-[hover=true]:border-default-400 group-data-[focus=true]:border-default-500',
                      helperWrapper: 'absolute bottom-[-22px]',
                    }}
                    {...register('email', emailValidation)}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    errorMessage={emailError}
                  />
                </div>
                <div className={styles.authForm__inputContainer}>
                  <Input
                    size="sm"
                    radius="md"
                    variant="bordered"
                    type="password"
                    label="Password"
                    classNames={{
                      inputWrapper:
                        'border-1 border-default-200 data-[hover=true]:border-default-400 group-data-[focus=true]:border-default-500',
                      helperWrapper: 'absolute bottom-[-22px]',
                    }}
                    {...register('password', passValidation)}
                    onChange={(e) => handlePassChange(e.target.value)}
                    errorMessage={passwordError}
                  />
                </div>
                <p className={styles.authForm__link}>
                  Need to create an account?{' '}
                  <Link
                    size="sm"
                    href="/signup"
                    color="warning"
                    underline="always"
                  >
                    Sign up
                  </Link>
                </p>
                <div>
                  <Button fullWidth variant="bordered" type="submit" size="lg">
                    Submit
                  </Button>
                </div>
                <p className={styles.authForm__error}>{isError}</p>
              </form>
            </FormProvider>
          </CardBody>
        </Card>
      </div>
    </main>
  )
}

export default LoginPage

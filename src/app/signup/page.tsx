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

interface SignupType {
  email: string
  password: string
  name: string
}

const SignupPage = () => {
  const { signUp } = useAuth()
  const router = useRouter()
  const [isError, setIsError] = useState('')
  const methods = useForm<SignupType>({ mode: 'onBlur' })
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

  const onSubmit = async (data: SignupType) => {
    try {
      await signUp(data.email, data.password)
      router.push('/dashboard')
      setIsError('')
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
    <main className={styles.authForm}>
      <div className={styles.authForm__container}>
        <Card className={`${styles.authForm__card} max-w-full w-[380px]`}>
          <CardBody className={styles.authForm__cardBody}>
            <h1 className={styles.authForm__title}>Sign Up</h1>
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
                    type="text"
                    label="Name"
                    classNames={{
                      inputWrapper: 'border-1',
                      helperWrapper: 'absolute bottom-[-22px]',
                    }}
                    {...register('name')}
                  />
                </div>
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
                  Already have an account?{' '}
                  <Link
                    size="sm"
                    href="/login"
                    color="warning"
                    underline="always"
                  >
                    Login
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

export default SignupPage

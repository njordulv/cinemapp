'use client'

import { FC, useState } from 'react'
import { Input, Card, CardBody, Button, Link } from '@nextui-org/react'
import styles from '@/styles/authForm.module.scss'

interface FormProps {
  title: string
  error: string | null
  handleClick: (email: string, pass: string) => void
}

const Form: FC<FormProps> = ({ title, error, handleClick }) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const handleSubmit = (event: any) => {
    event.preventDefault()
    handleClick(email, pass)
  }

  return (
    <main className={styles.authForm}>
      <div className={styles.authForm__container}>
        <Card className={`${styles.authForm__card} max-w-full w-[380px]`}>
          <CardBody className={styles.authForm__cardBody}>
            <h1 className={styles.authForm__title}>{title}</h1>
            <form
              action=""
              className={styles.authForm__form}
              onSubmit={handleSubmit}
            >
              <div className={styles.authForm__inputContainer}>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  errorMessage={error}
                />
              </div>
              <div className={styles.authForm__inputContainer}>
                <Input
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
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
                />
              </div>
              <p className={styles.authForm__link}>
                Need to create an account?{' '}
                <Link size="sm" href="/register" color="primary">
                  {title}
                </Link>
              </p>
              <div>
                <Button fullWidth variant="bordered" type="submit" size="lg">
                  {title}
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </main>
  )
}

export default Form

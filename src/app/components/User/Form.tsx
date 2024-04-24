'use client'

import { FC, useState, useMemo } from 'react'
import { Input, Card, CardBody, Button } from '@nextui-org/react'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { setError } from '@/redux/slices/errorSlice'
import Error from '@/components/User/Error'
import styles from '@/styles/authForm.module.scss'

interface FormProps {
  title: string
  error: string | null
  handleClick: (email: string, pass: string) => void
}

const Form: FC<FormProps> = ({ title, error, handleClick }) => {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [value, setValue] = useState('')

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)

  const isInvalid = useMemo(() => {
    if (value === '') return false

    return validateEmail(value) ? false : true
  }, [value])

  const handleSubmit = (event: any) => {
    event.preventDefault()
    handleClick(email, pass)
    if (error) {
      dispatch(setError(error))
    }
  }

  return (
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
                isInvalid={isInvalid}
                color={isInvalid ? 'danger' : 'default'}
                errorMessage={isInvalid && 'Please enter a valid email'}
                onValueChange={setValue}
                classNames={{
                  inputWrapper:
                    'border-1 border-default-200 data-[hover=true]:border-default-400 group-data-[focus=true]:border-default-500',
                  helperWrapper: 'absolute bottom-[-22px]',
                }}
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
            <div>
              <Button fullWidth variant="bordered" type="submit" size="lg">
                {title}
              </Button>
            </div>
          </form>
          <Error />
        </CardBody>
      </Card>
    </div>
  )
}

export default Form

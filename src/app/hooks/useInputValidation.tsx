import { useCallback, useState } from 'react'
import { debounce } from 'lodash'
import { useForm } from 'react-hook-form'

type ValidationPattern = {
  pattern: RegExp
  message: string
}

export const useInputValidation = (validationPattern: ValidationPattern) => {
  const [error, setError] = useState<string | null>(null)
  const { clearErrors, setError: setFormError } = useForm()

  const handleInputChange = useCallback(
    debounce((value: string) => {
      if (value === '') {
        clearErrors()
        setError(null)
      } else {
        if (!validationPattern.pattern.test(value)) {
          setFormError('field', {
            type: 'manual',
            message: validationPattern.message,
          })
          setError(validationPattern.message)
        } else {
          clearErrors('field')
          setError(null)
        }
      }
    }, 300),
    [validationPattern, clearErrors, setFormError]
  )

  return { error, handleInputChange }
}

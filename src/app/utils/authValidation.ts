export const patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const patternPass = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/

export const emailValidation = {
  required: 'Email is required',
  pattern: {
    value: patternEmail,
    message: 'Invalid email format',
  },
}

export const passValidation = {
  required: 'Password is required',
  minLength: {
    value: 8,
    message: 'Password must be at least 8 characters',
  },
  pattern: {
    value: patternPass,
    message: 'Password must include at least one letter and one number',
  },
}

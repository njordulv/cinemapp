import { useAppSelector } from './reduxHooks'

export function useAuth() {
  const { email, token, id } = useAppSelector((state) => state.user)

  return {
    isAuth: !!email,
    email,
    token,
    id,
  }
}

import { useAppSelector } from '@/hooks/reduxHooks'

export function useAuth() {
  const { email, token, id, createdAt, name, avatarUrl } = useAppSelector(
    (state) => state.user
  )

  return {
    isAuth: !!email,
    email,
    token,
    id,
    createdAt,
    name,
    avatarUrl,
  }
}

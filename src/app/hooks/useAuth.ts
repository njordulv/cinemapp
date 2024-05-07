import { useAppSelector } from '@/hooks/reduxHooks'

export function useAuth() {
  const { email, token, id, createdAt, name, photoURL, watchlist, favorites } =
    useAppSelector((state) => state.user)

  return {
    isAuth: !!email,
    email,
    token,
    id,
    createdAt,
    name,
    photoURL,
    watchlist,
    favorites,
  }
}

import { useEffect, useState } from 'react'
import { Button, Tooltip } from '@nextui-org/react'
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore'
import { auth } from '@/config/firebase'
import { useAuth } from '@/hooks/useAuth'
import { Movie } from '@/types/data'
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks'
import {
  addToWatchlist,
  removeFromWatchlist,
  selectWatchlist,
  addToFavorites,
  removeFromFavorites,
  selectFavorites,
} from '@/redux/slices/userSlice'

interface ToggleProps {
  movie: Movie
  type: 'movie' | 'tv'
  isWatchlist?: boolean
  Icon: React.FC<{ isActive: boolean }>
}

const ToggleButton: React.FC<ToggleProps> = ({
  movie,
  type,
  isWatchlist = false,
  Icon,
}: ToggleProps) => {
  const dispatch = useAppDispatch()
  const list =
    useAppSelector(isWatchlist ? selectWatchlist : selectFavorites) || []
  const isInList = list.some(
    (item) => item.id === movie.id && item.type === type
  )
  const [tooltipText, setTooltipText] = useState('')
  const { isAuth } = useAuth()

  const handleToggleWatchlist = async () => {
    const user = auth.currentUser

    if (user) {
      const userId = user.uid
      const firestore = getFirestore()
      const userDocRef = doc(firestore, 'users', userId)

      if (isInList) {
        await updateDoc(userDocRef, {
          [isWatchlist ? 'watchlist' : 'favorites']: arrayRemove({
            id: movie.id,
            type,
          }),
        })
        isWatchlist
          ? dispatch(removeFromWatchlist({ id: movie.id, type }))
          : dispatch(removeFromFavorites({ id: movie.id, type }))
      } else {
        await updateDoc(userDocRef, {
          [isWatchlist ? 'watchlist' : 'favorites']: arrayUnion({
            id: movie.id,
            type,
          }),
        })
        isWatchlist
          ? dispatch(addToWatchlist({ id: movie.id, type }))
          : dispatch(addToFavorites({ id: movie.id, type }))
      }
    }
  }

  useEffect(() => {
    setTooltipText(
      isInList
        ? `Remove from ${isWatchlist ? 'watchlist' : 'favorites'}`
        : `Add to ${isWatchlist ? 'watchlist' : 'favorites'}`
    )
  }, [isInList, isWatchlist])

  if (!isAuth) return null

  return (
    <Tooltip size="sm" showArrow={true} offset={-1} content={tooltipText}>
      <Button
        isIconOnly
        color="default"
        variant="flat"
        size="sm"
        aria-label={tooltipText}
        className={`text-lg ${
          isWatchlist ? 'watchlistButton' : 'favoritesButton'
        }`}
        onClick={handleToggleWatchlist}
      >
        <Icon isActive={isInList} />
      </Button>
    </Tooltip>
  )
}

export default ToggleButton

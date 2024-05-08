import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { Button, Tooltip } from '@nextui-org/react'
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore'
import { auth } from '@/config/firebase'
import { Movie } from '@/types/data'
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks'
import {
  addToFavorites,
  removeFromFavorites,
  selectFavorites,
} from '@/redux/slices/userSlice'
import { useEffect, useState } from 'react'

interface MovieProps {
  movie: Movie
  type: 'movie' | 'tv'
}

const FavoritesToggle: React.FC<MovieProps> = ({ movie, type }: MovieProps) => {
  const dispatch = useAppDispatch()
  const favorites = useAppSelector(selectFavorites) || []
  const isInFavorites = favorites.some(
    (item) => item.id === movie.id && item.type === type
  )
  const [tooltipText, setTooltipText] = useState('')

  const handleToggleFavorite = async () => {
    const user = auth.currentUser

    if (user) {
      const userId = user.uid
      const firestore = getFirestore()
      const userDocRef = doc(firestore, 'users', userId)

      if (isInFavorites) {
        await updateDoc(userDocRef, {
          favorites: arrayRemove({ id: movie.id, type }),
        })
        dispatch(removeFromFavorites({ id: movie.id, type }))
      } else {
        await updateDoc(userDocRef, {
          favorites: arrayUnion({ id: movie.id, type }),
        })
        dispatch(addToFavorites({ id: movie.id, type }))
      }
    }
  }

  useEffect(() => {
    setTooltipText(isInFavorites ? 'Remove from favorites' : 'Add to favorites')
  }, [isInFavorites])

  return (
    <Tooltip size="sm" content={tooltipText}>
      <Button
        isIconOnly
        color="default"
        variant="flat"
        size="sm"
        aria-label={
          isInFavorites ? 'Remove from favorites' : 'Add to favorites'
        }
        className="text-lg watchlistButton"
        onClick={handleToggleFavorite}
      >
        {isInFavorites ? <MdFavorite /> : <MdFavoriteBorder />}
      </Button>
    </Tooltip>
  )
}

export default FavoritesToggle

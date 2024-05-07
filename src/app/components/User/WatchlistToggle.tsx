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
  addToWatchlist,
  removeFromWatchlist,
  selectWatchlist,
} from '@/redux/slices/userSlice'
import { useEffect, useState } from 'react'

interface MovieProps {
  movie: Movie
}

const WatchlistToggle: React.FC<MovieProps> = ({ movie }: MovieProps) => {
  const dispatch = useAppDispatch()
  const watchlist = useAppSelector(selectWatchlist) || []
  const isInWatchlist = watchlist.includes(movie.id)
  const [tooltipText, setTooltipText] = useState('')
  const [watchlistIcon, setWatchlistIcon] = useState(<MdFavoriteBorder />)

  const handleToggleWatchlist = async () => {
    const user = auth.currentUser

    if (user) {
      const userId = user.uid
      const firestore = getFirestore()
      const userDocRef = doc(firestore, 'users', userId)

      if (isInWatchlist) {
        await updateDoc(userDocRef, { watchlist: arrayRemove(movie.id) })
        dispatch(removeFromWatchlist(movie.id))
      } else {
        await updateDoc(userDocRef, { watchlist: arrayUnion(movie.id) })
        dispatch(addToWatchlist(movie.id))
      }
    }
  }

  useEffect(() => {
    if (isInWatchlist) {
      setTooltipText('Remove from watchlist')
      setWatchlistIcon(<MdFavorite />)
    } else {
      setTooltipText('Add to watchlist')
      setWatchlistIcon(<MdFavoriteBorder />)
    }
  }, [])

  return (
    <Tooltip size="sm" content={tooltipText}>
      <Button
        isIconOnly
        color="default"
        variant="flat"
        size="sm"
        aria-label="Like"
        className="absolute right-1 top-1 z-20 text-lg"
        onClick={handleToggleWatchlist}
      >
        {watchlistIcon}
      </Button>
    </Tooltip>
  )
}

export default WatchlistToggle

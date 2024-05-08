import { MdOutlineBookmarkBorder, MdOutlineBookmark } from 'react-icons/md'
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
  type: 'movie' | 'tv'
}

const WatchlistToggle: React.FC<MovieProps> = ({ movie, type }: MovieProps) => {
  const dispatch = useAppDispatch()
  const watchlist = useAppSelector(selectWatchlist) || []
  const isInWatchlist = watchlist.some(
    (item) => item.id === movie.id && item.type === type
  )
  const [tooltipText, setTooltipText] = useState('')

  const handleToggleWatchlist = async () => {
    const user = auth.currentUser

    if (user) {
      const userId = user.uid
      const firestore = getFirestore()
      const userDocRef = doc(firestore, 'users', userId)

      if (isInWatchlist) {
        await updateDoc(userDocRef, {
          watchlist: arrayRemove({ id: movie.id, type }),
        })
        dispatch(removeFromWatchlist({ id: movie.id, type }))
      } else {
        await updateDoc(userDocRef, {
          watchlist: arrayUnion({ id: movie.id, type }),
        })
        dispatch(addToWatchlist({ id: movie.id, type }))
      }
    }
  }

  useEffect(() => {
    setTooltipText(isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist')
  }, [isInWatchlist])

  return (
    <Tooltip size="sm" content={tooltipText}>
      <Button
        isIconOnly
        color="default"
        variant="flat"
        size="sm"
        aria-label={
          isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'
        }
        className="text-lg favoritesButton"
        onClick={handleToggleWatchlist}
      >
        {isInWatchlist ? <MdOutlineBookmark /> : <MdOutlineBookmarkBorder />}
      </Button>
    </Tooltip>
  )
}

export default WatchlistToggle

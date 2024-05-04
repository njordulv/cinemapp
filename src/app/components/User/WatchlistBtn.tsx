import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { Button } from '@nextui-org/react'
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
  addTowatchlist,
  removeFromwatchlist,
  selectwatchlist,
} from '@/redux/slices/userSlice'

interface MovieProps {
  movie: Movie
}

const watchlistBtn: React.FC<MovieProps> = ({ movie }: MovieProps) => {
  const dispatch = useAppDispatch()
  const watchlist = useAppSelector(selectwatchlist) || []
  const isInwatchlist = watchlist.includes(movie.id)

  const handlewatchlistClick = async () => {
    const user = auth.currentUser

    if (user) {
      const userId = user.uid
      const firestore = getFirestore()
      const userDocRef = doc(firestore, 'users', userId)

      if (isInwatchlist) {
        await updateDoc(userDocRef, { watchlist: arrayRemove(movie.id) })
        dispatch(removeFromwatchlist(movie.id))
      } else {
        await updateDoc(userDocRef, { watchlist: arrayUnion(movie.id) })
        dispatch(addTowatchlist(movie.id))
      }
    }
  }

  return (
    <Button
      isIconOnly
      color="default"
      variant="flat"
      size="sm"
      aria-label="Like"
      className="absolute right-1 top-1 z-20 text-lg"
      onClick={handlewatchlistClick}
    >
      {isInwatchlist ? <MdFavorite /> : <MdFavoriteBorder />}
    </Button>
  )
}

export default watchlistBtn

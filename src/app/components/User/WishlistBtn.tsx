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
  addToWishlist,
  removeFromWishlist,
  selectWishlist,
} from '@/redux/slices/userSlice'

interface UserProps {
  movie: Movie
}

const WishlistBtn: React.FC<UserProps> = ({ movie }: UserProps) => {
  const dispatch = useAppDispatch()
  const wishlist = useAppSelector(selectWishlist) || []
  const isInWishlist = wishlist.includes(movie.id)

  const handleWishlistClick = async () => {
    const user = auth.currentUser
    if (user) {
      const userId = user.uid
      const firestore = getFirestore()
      const userDocRef = doc(firestore, 'users', userId)

      if (isInWishlist) {
        await updateDoc(userDocRef, { wishlist: arrayRemove(movie.id) })
        dispatch(removeFromWishlist(movie.id))
      } else {
        await updateDoc(userDocRef, { wishlist: arrayUnion(movie.id) })
        dispatch(addToWishlist(movie.id))
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
      onClick={handleWishlistClick}
    >
      {isInWishlist ? <MdFavorite /> : <MdFavoriteBorder />}
    </Button>
  )
}

export default WishlistBtn

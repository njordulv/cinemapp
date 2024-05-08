import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { Movie } from '@/types/data'
import ToggleButton from '@/components/User/ToggleButton'

interface MovieProps {
  movie: Movie
  type: 'movie' | 'tv'
}

const FavoritesIcon: React.FC<{ isActive: boolean }> = ({ isActive }) =>
  isActive ? <MdFavorite /> : <MdFavoriteBorder />

const ToggleFavorites: React.FC<MovieProps> = ({ movie, type }) => (
  <ToggleButton movie={movie} type={type} Icon={FavoritesIcon} />
)

export default ToggleFavorites

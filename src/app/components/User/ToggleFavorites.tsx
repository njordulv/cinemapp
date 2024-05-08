import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { Movie } from '@/types/data'
import ToggleButton from '@/components/User/ToggleButton'

interface MovieProps {
  id: number
  type: 'movie' | 'tv'
}

const FavoritesIcon: React.FC<{ isActive: boolean }> = ({ isActive }) =>
  isActive ? <MdFavorite /> : <MdFavoriteBorder />

const ToggleFavorites: React.FC<MovieProps> = ({ id, type }) => (
  <ToggleButton id={id} type={type} Icon={FavoritesIcon} />
)

export default ToggleFavorites

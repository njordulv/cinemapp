import { MdOutlineBookmarkBorder, MdOutlineBookmark } from 'react-icons/md'
import { Movie } from '@/types/data'
import ToggleButton from '@/components/User/ToggleButton'

interface MovieProps {
  movie: Movie
  type: 'movie' | 'tv'
}

const WatchlistIcon: React.FC<{ isActive: boolean }> = ({ isActive }) =>
  isActive ? <MdOutlineBookmark /> : <MdOutlineBookmarkBorder />

const ToggleWatchlist: React.FC<MovieProps> = ({ movie, type }) => (
  <ToggleButton movie={movie} type={type} isWatchlist Icon={WatchlistIcon} />
)

export default ToggleWatchlist

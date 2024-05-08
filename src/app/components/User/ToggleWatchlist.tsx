import { MdOutlineBookmarkBorder, MdOutlineBookmark } from 'react-icons/md'
import { Movie } from '@/types/data'
import ToggleButton from '@/components/User/ToggleButton'

interface MovieProps {
  id: number
  type: 'movie' | 'tv'
}

const WatchlistIcon: React.FC<{ isActive: boolean }> = ({ isActive }) =>
  isActive ? <MdOutlineBookmark /> : <MdOutlineBookmarkBorder />

const ToggleWatchlist: React.FC<MovieProps> = ({ id, type }) => (
  <ToggleButton id={id} type={type} isWatchlist Icon={WatchlistIcon} />
)

export default ToggleWatchlist

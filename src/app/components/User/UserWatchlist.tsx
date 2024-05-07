import { useEffect, useState } from 'react'
import { Spinner } from '@nextui-org/react'
import { useAppSelector } from '@/hooks/reduxHooks'
import { selectWatchlist } from '@/redux/slices/userSlice'
import { Movie } from '@/types/data'
import MovieCard from '@/components/UI/MovieCard'

export default function UserWatchlist() {
  const wishlist = useAppSelector(selectWatchlist)
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const type = 'movie'
  const category = ''

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      try {
        const moviePromises = wishlist.map((id) =>
          fetch(`/api/movies/?endpoint=${type}/${id}`).then((res) => res.json())
        )
        const movies = await Promise.all(moviePromises)
        setMovies(movies)
      } catch (err) {
        setError('Failed to fetch movies')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [wishlist])

  if (loading)
    return (
      <div className="flex place-content-center min-h-72">
        <Spinner color="default" />
      </div>
    )
  if (error)
    return <div className="flex place-content-center min-h-72">{error}</div>

  return (
    <div className="flex gap-3">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          type={type}
          category={category}
        />
      ))}
    </div>
  )
}

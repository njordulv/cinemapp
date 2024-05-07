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

  if (loading) return <Spinner color="default" />
  if (error) return <> {error} </>

  return (
    <div className="grid text-center lg:max-w-[1170px] lg:w-full lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-1 justify-center gap-4 m-auto">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            type={type}
            category={category}
          />
        ))
      ) : (
        <p>There no movies in your watchlist</p>
      )}
    </div>
  )
}

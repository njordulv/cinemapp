import { useEffect, useState } from 'react'
import { Spinner } from '@nextui-org/react'
import { useAppSelector } from '@/hooks/reduxHooks'
import { selectFavorites } from '@/redux/slices/userSlice'
import { Movie } from '@/types/data'
import MovieCard from '@/components/UI/MovieCard'

export default function UserFavorites() {
  const favorite = useAppSelector(selectFavorites) || []
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      try {
        const moviePromises = favorite.map((item) =>
          fetch(`/api/movies/?endpoint=${item.type}/${item.id}`).then((res) =>
            res.json()
          )
        )
        const movies = await Promise.all(moviePromises)
        setMovies(movies)
      } catch (err) {
        setError('Failed to fetch movies')
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [favorite])

  if (loading) return <Spinner color="default" />
  if (error) return <> {error} </>

  return (
    <>
      {movies.length > 0 ? (
        <div className="grid text-center lg:max-w-[1170px] lg:w-full lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-1 justify-center gap-4 m-auto">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              type={!movie.type ? 'movie' : 'tv'}
              category=""
            />
          ))}
        </div>
      ) : (
        <p>There no movies in your favorite</p>
      )}
    </>
  )
}

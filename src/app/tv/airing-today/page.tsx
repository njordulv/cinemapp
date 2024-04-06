import { getMovies } from '@/actions/getMovies'
import MovieList from '@/components/UI/MovieList'

export default async function Page() {
  const page = 1
  const type = 'tv'
  const category = 'airing_today'
  const heading = ' TV Shows Airing Today'
  const initialMovies = await getMovies(page, type, category)

  return (
    <main className="flex flex-col items-center min-h-96 w-full max-w-[1170px] m-auto px-4 py-10 gap-5">
      <MovieList
        initialMovies={initialMovies}
        type={type}
        category={category}
        heading={heading}
      />
    </main>
  )
}

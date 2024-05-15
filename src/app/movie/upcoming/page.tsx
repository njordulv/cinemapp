import { Metadata } from 'next'
import { getAPIData } from '@/utils/getAPIData'
import { Movie } from '@/types/data'
import MovieList from '@/components/UI/MovieList'

export const metadata: Metadata = {
  title: 'Upcoming Movies - CinemApp',
  description: 'An Application for Movie Enthusiasts',
}

export default async function Page() {
  const page = 1
  const type = 'movie'
  const category = 'upcoming'
  const heading = 'Upcoming Movies'
  const initialMovies = await getAPIData<Movie>(page, type, category)

  return (
    <main className="flex flex-col items-center place-content-center min-h-96 w-full max-w-[1170px] m-auto px-4 py-10 gap-5">
      <MovieList
        initialMovies={initialMovies}
        type={type}
        category={category}
        heading={heading}
      />
    </main>
  )
}

import { Metadata } from 'next'
import { getAPIData } from '@/utils/getAPIData'
import { Movie } from '@/types/data'
import MovieList from '@/components/UI/MovieList'

export const metadata: Metadata = {
  title: 'Currently Airing TV Shows - CinemApp',
  description: 'An Application for Movie Enthusiasts',
}

export default async function Page() {
  const page = 1
  const type = 'tv'
  const category = 'on_the_air'
  const heading = 'Currently Airing TV Shows'
  const initialMovies = await getAPIData<Movie>(page, type, category)

  return (
    <main className="flex flex-col items-center w-full max-w-[1170px] m-auto px-4 py-10 gap-5">
      <MovieList
        initialMovies={initialMovies}
        type={type}
        category={category}
        heading={heading}
      />
    </main>
  )
}

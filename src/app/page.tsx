import { Metadata } from 'next'
import { getAPIData } from '@/utils/getAPIData'
import { Movie } from '@/types/data'
import MovieList from '@/components/UI/MovieList'

export const metadata: Metadata = {
  metadataBase: new URL('https://cinemapp-movie.vercel.app'),
  title: 'Cinemapp',
  description: 'An Application for Movie Enthusiasts',
  openGraph: {
    title: 'Cinemapp',
    description: 'An Application for Movie Enthusiasts',
    url: 'https://cinemapp-movie.vercel.app',
    siteName: 'Cinemapp',
    images: [
      {
        url: 'https://cinemapp-movie.vercel.app/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Open Graph Image Alt',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default async function Page() {
  const page = 1
  const type = 'movie'
  const category = 'popular'
  const heading = 'Popular Movies'
  const initialMovies = await getAPIData<Movie>(page, type, category)

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

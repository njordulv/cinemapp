'use client'

import { useState } from 'react'
import { Button } from '@nextui-org/react'
import { getAPIData } from '@/utils/getAPIData'
import { Movie } from '@/types/data'
import MovieCard from '@/components/UI/MovieCard'

type MovieListProps = {
  initialMovies: Movie[]
  type: 'movie' | 'tv'
  category: string
  heading: string
}

const NUMB_OF_MOVIES_TO_FETCH = 20

export default function MovieList({
  initialMovies,
  type,
  category,
  heading,
}: MovieListProps) {
  const [offset, setOffset] = useState(NUMB_OF_MOVIES_TO_FETCH)
  const [movies, setMovies] = useState<Movie[]>(initialMovies)

  const loadMore = async () => {
    try {
      const apiMovies = await getAPIData<Movie>(offset, type, category)
      setMovies([...movies, ...apiMovies])
      setOffset(offset + NUMB_OF_MOVIES_TO_FETCH)
    } catch (e) {
      console.error('Error fetching data:', e)
    }
  }

  return (
    <>
      <h1 className="flex self-start font-medium text-4xl">{heading}</h1>
      <div className="grid lg:max-w-[1170px] w-full lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-4 justify-items-center mb-0">
        {movies?.length > 0 &&
          movies.map((movie: Movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              type={type}
              category={category}
            />
          ))}
      </div>
      <div className="flex items-center justify-center">
        <Button size="lg" onClick={loadMore} variant="ghost">
          Load more
        </Button>
      </div>
    </>
  )
}

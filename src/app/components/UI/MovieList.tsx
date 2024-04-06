'use client'

import { useState } from 'react'
import { Button } from '@nextui-org/react'
import { getMovies } from '@/actions/getMovies'
import { Movie } from '@/types/Movie'
import MovieCard from '@/components/UI/MovieCard'

type MovieListProps = {
  initialMovies: Movie[]
  type: string
  category: string
}

const NUMB_OF_MOVIES_TO_FETCH = 20

export default function MovieList({
  initialMovies,
  type,
  category,
}: MovieListProps) {
  const [offset, setOffset] = useState(NUMB_OF_MOVIES_TO_FETCH)
  const [movies, setMovies] = useState<Movie[]>(initialMovies)

  const loadMore = async () => {
    const apiMovies = await getMovies(offset, type, category)
    setMovies([...movies, ...apiMovies])
    setOffset(offset + NUMB_OF_MOVIES_TO_FETCH)
  }

  return (
    <>
      <div className="grid lg:max-w-[1170px] w-full lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-4 justify-items-center mb-0">
        {movies.map((movie: Movie, index: number) => (
          <MovieCard
            key={index}
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

'use client'

import { useState, useEffect } from 'react'
import MovieCard from '@/components/UI/MovieCard'

interface Movie {
  id: number
  title: string
  overview: string
  release_date: string
  poster_path?: string
  image?: string
}

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch('/api/popular')
      const data = await res.json()
      setMovies(data.results)
    }
    fetchMovies()
  }, [])

  return (
    <>
      {movies.map((movie) => (
        <MovieCard
          {...movie}
          image={`${BASE_IMAGE_URL}${movie.poster_path}`}
          key={movie.id}
        />
      ))}
    </>
  )
}

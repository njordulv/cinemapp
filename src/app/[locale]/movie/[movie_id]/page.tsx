'use client'

import SingleMovieData from '@/types/SingleMovieData'

export default function page({ id, title }: SingleMovieData) {
  return (
    <div>
      <h1>There is</h1>
      <h2>{title}</h2>
      <p>{id}</p>
    </div>
  )
}

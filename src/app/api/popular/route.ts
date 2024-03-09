import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const API_KEY = process.env.TMDB_API_KEY
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  )
  const data = await response.json()
  return NextResponse.json(data)
}

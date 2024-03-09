import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const API_KEY = process.env.TMDB_API_KEY
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}`
  )
  const data = await response.json()
  return NextResponse.json(data)
}

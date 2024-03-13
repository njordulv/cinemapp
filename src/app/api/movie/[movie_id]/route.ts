import { NextResponse } from 'next/server'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export const runtime = 'edge'

export async function GET(
  req: Request,
  { params }: { params: { movie_id: string } }
) {
  const { movie_id } = params

  try {
    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}`
    )
    const movieData = await movieResponse.json()

    const creditsResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}`
    )
    const creditsData = await creditsResponse.json()

    const combinedData = {
      ...movieData,
      cast: creditsData.cast,
      crew: creditsData.crew,
    }

    return NextResponse.json(combinedData)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export const config = {
  runtime: 'edge',
}

export async function GET(
  req: Request,
  { params }: { params: { movie_id: string } }
) {
  const { movie_id } = params
  console.log('Movie ID:', movie_id)

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}`
    )
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export const config = {
  runtime: 'edge',
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = searchParams.get('page') || '1'

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    )
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

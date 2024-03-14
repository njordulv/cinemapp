import { NextResponse } from 'next/server'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export const runtime = 'edge'

export async function GET(
  req: Request,
  { params }: { params: { person_id: string } }
) {
  const { person_id } = params

  try {
    const personResponse = await fetch(
      `https://api.themoviedb.org/3/person/${person_id}?api_key=${API_KEY}`
    )
    const movieData = await personResponse.json()

    const combinedData = {
      ...movieData,
    }

    return NextResponse.json(combinedData)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export const runtime = 'edge'

export async function GET(
  req: Request,
  { params }: { params: { tv_id: string } }
) {
  const { tv_id } = params

  try {
    const tvResponse = await fetch(
      `https://api.themoviedb.org/3/tv/${tv_id}?api_key=${API_KEY}`
    )
    const tvData = await tvResponse.json()

    const creditsResponse = await fetch(
      `https://api.themoviedb.org/3/tv/${tv_id}/credits?api_key=${API_KEY}`
    )
    const creditsData = await creditsResponse.json()

    const combinedData = {
      ...tvData,
      cast: creditsData.cast,
      crew: creditsData.crew,
    }

    return NextResponse.json(combinedData)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

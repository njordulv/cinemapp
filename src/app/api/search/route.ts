import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const endpoint = searchParams.get('endpoint') || ''
  const query = searchParams.get('query')

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

  const response = await fetch(
    `${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}`
  )
  const data = await response.json()

  return NextResponse.json(data)
}

import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('query')
  const type = searchParams.get('type') || ''

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

  const response = await fetch(
    `${BASE_URL}/search/${type}?query=${query}&api_key=${API_KEY}`
  )
  const data = await response.json()

  return NextResponse.json(data)
}

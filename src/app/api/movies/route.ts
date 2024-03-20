import { NextResponse } from 'next/server'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const endpoint = searchParams.get('endpoint') || ''
  const page = searchParams.get('page') || '1'
  const combinedEndpoints =
    searchParams.get('combinedEndpoints')?.split(',') || []

  try {
    const responses = await Promise.all([
      fetch(
        `${BASE_URL}/${endpoint}?api_key=${API_KEY}&language=en-US&page=${page}`
      ),
      ...combinedEndpoints.map((additionalEndpoint) =>
        fetch(
          `${BASE_URL}/${additionalEndpoint}?api_key=${API_KEY}&language=en-US&page=${page}`
        )
      ),
    ])

    const data = await Promise.all(responses.map((response) => response.json()))

    if (combinedEndpoints.length > 0) {
      const combinedData = data.reduce((acc, curr, index) => {
        if (index === 0) {
          return { ...curr }
        } else {
          const key = combinedEndpoints[index - 1]?.split('/').pop()
          if (key) {
            acc[key] = curr
          }
          return acc
        }
      }, {})
      return NextResponse.json(combinedData)
    } else {
      return NextResponse.json(data[0])
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}

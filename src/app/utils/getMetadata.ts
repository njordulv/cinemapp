import type { Metadata } from 'next'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY!
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export async function getMetadata(
  type: string,
  params: { [key: string]: string }
): Promise<Metadata> {
  const url = new URL(`${BASE_URL}/${type}`)
  url.searchParams.append('api_key', API_KEY)

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, value)
  }

  const response = await fetch(url.toString())
  const data = await response.json()

  return {
    title: `${data.title || data.name} - CinemApp`,
    description: data.overview || data.biography,
  }
}

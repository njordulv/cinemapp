import { NextRequest, NextResponse } from 'next/server'

const BASE_URL = 'https://cinemapp-movie.vercel.app'
const API_URL = process.env.NEXT_PUBLIC_BASE_URL
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

interface Movie {
  id: number
}

interface TVShow {
  id: number
}

async function fetchMovies(): Promise<Movie[]> {
  const res = await fetch(`${API_URL}movie/popular?api_key=${API_KEY}`)
  const data = await res.json()
  return data.results as Movie[]
}

async function fetchTVShows(): Promise<TVShow[]> {
  const res = await fetch(`${API_URL}tv/popular?api_key=${API_KEY}`)
  const data = await res.json()
  return data.results as TVShow[]
}

function generateSiteMap(movies: Movie[], tvShows: TVShow[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${BASE_URL}</loc>
     </url>
     <url>
       <loc>${BASE_URL}/movie</loc>
     </url>
     <url>
       <loc>${BASE_URL}/tv</loc>
     </url>
     <url>
       <loc>${BASE_URL}/person</loc>
     </url>
     ${movies
       .map(({ id }) => {
         return `
       <url>
           <loc>${BASE_URL}/movie/${id}</loc>
       </url>
     `
       })
       .join('')}
     ${tvShows
       .map(({ id }) => {
         return `
       <url>
           <loc>${BASE_URL}/tv/${id}</loc>
       </url>
     `
       })
       .join('')}
   </urlset>
 `
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const movies = await fetchMovies()
  const tvShows = await fetchTVShows()

  const sitemap = generateSiteMap(movies, tvShows)

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}

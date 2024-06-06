import { SitemapStream, streamToPromise } from 'sitemap'
import { createGzip } from 'zlib'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res.setHeader('Content-Type', 'application/xml')
    res.setHeader('Content-Encoding', 'gzip')

    const smStream = new SitemapStream({
      hostname: 'https://cinemapp-movie.vercel.app/',
    })
    const pipeline = smStream.pipe(createGzip())

    smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 })
    smStream.write({ url: '/movie', changefreq: 'monthly', priority: 0.7 })
    smStream.write({ url: '/tv', changefreq: 'monthly', priority: 0.7 })
    smStream.write({ url: '/person', changefreq: 'monthly', priority: 0.7 })

    smStream.end()

    const sitemap = await streamToPromise(pipeline)
    res.send(sitemap)
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}

import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/movie', '/tv', 'person'],
      disallow: ['/api', '/dashborard', '/login', '/register'],
    },
  }
}

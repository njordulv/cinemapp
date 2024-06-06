/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://cinemapp-movie.vercel.app/',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 1000,
}

export default config

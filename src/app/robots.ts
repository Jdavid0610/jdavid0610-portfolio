import type { MetadataRoute } from 'next'
import { siteConfig } from '@/shared/config/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Authenticated surfaces are also `noindex` per page; this saves crawl budget.
        disallow: ['/api/', '/*/dashboard', '/*/posts', '/*/settings', '/*/admin', '/*/sign-in', '/*/sign-up'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}

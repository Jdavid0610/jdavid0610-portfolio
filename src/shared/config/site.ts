import { clientEnv } from '@/server/env'

/**
 * Single source of truth for anything that shows up in a <head>, a sitemap or
 * a structured-data block. Change it here, every surface follows.
 */
export const siteConfig = {
  name: 'Next Stack',
  shortName: 'NextStack',
  description:
    'A production-shaped Next.js template: server rendering, complete SEO, authentication, RBAC and a modular backend in one repository.',
  url: clientEnv.NEXT_PUBLIC_APP_URL.replace(/\/$/, ''),
  ogImage: '/opengraph-image',
  twitter: '@nextstack',
  keywords: [
    'Next.js',
    'App Router',
    'SSR',
    'SEO',
    'authentication',
    'Drizzle',
    'PostgreSQL',
    'TypeScript',
  ],
  author: { name: 'Next Stack', url: clientEnv.NEXT_PUBLIC_APP_URL },
} as const

export type SiteConfig = typeof siteConfig

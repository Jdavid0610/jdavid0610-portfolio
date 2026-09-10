import { clientEnv } from '@/server/env'

/**
 * Single source of truth for anything that shows up in a <head>, a sitemap, a
 * structured-data block or `llms.txt`. Change it here, every surface follows.
 *
 * `url` derives from `NEXT_PUBLIC_APP_URL`, so the canonical origin is a
 * deploy-time decision and no origin is ever hardcoded in the source.
 */
export const siteConfig = {
  /** The site's subject. A personal portfolio's `WebSite.name` is his name. */
  name: 'Julian Ortiz Alviar',
  shortName: 'Julian Ortiz',
  fullName: 'Julian David Ortiz Alviar',
  handle: 'Jdavid0610',
  description:
    'Portfolio of Julian David Ortiz Alviar, Senior FullStack Developer, DevOps Specialist and AI Engineer based in Cali, Colombia.',
  url: clientEnv.NEXT_PUBLIC_APP_URL.replace(/\/$/, ''),
  ogImage: '/opengraph-image',
  /** No X/Twitter account is verified for him, so no `creator` is claimed. */
  twitter: undefined,
  keywords: [
    'Julian Ortiz Alviar',
    'Senior FullStack Developer',
    'DevOps Specialist',
    'AI Engineer',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Python',
    'AWS',
    'Microsoft Azure',
    'Cali Colombia',
  ],
  /** Unobfuscated on purpose: AI answer engines must be able to read them. */
  email: 'jdavidortizy2k@gmail.com',
  phone: { e164: '+573164344625', display: '+57 316 434 4625' },
  location: {
    locality: 'Cali',
    region: 'Valle del Cauca',
    country: 'CO',
    countryName: 'Colombia',
  },
  /**
   * Kept byte-identical to the `sameAs` array emitted in the JSON-LD graph:
   * two divergent `sameAs` lists on one site is an entity-resolution bug.
   */
  profiles: {
    linkedin: 'https://www.linkedin.com/in/julian-ortiz-alviar',
    github: 'https://github.com/Jdavid0610',
    company: 'https://phenoscience.com.co',
    clinpsia: 'https://clinpsia.com',
  },
  /** The template this site itself runs on — see `/open-source/next-stack`. */
  builtOn: { name: 'next-stack', repo: 'https://github.com/Jdavid0610/next-stack' },
  author: { name: 'Julian David Ortiz Alviar', url: clientEnv.NEXT_PUBLIC_APP_URL },
} as const

/** The `sameAs` set for the `Person` entity, in one place. */
export const sameAs: readonly string[] = [
  siteConfig.profiles.linkedin,
  siteConfig.profiles.github,
  siteConfig.profiles.company,
  siteConfig.profiles.clinpsia,
]

export type SiteConfig = typeof siteConfig

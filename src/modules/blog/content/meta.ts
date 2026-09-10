import type { PostMeta, PostSlug } from '../domain/types'

/** Newest first, which is the order the feed renders. */
export const postMeta: readonly PostMeta[] = [
  {
    slug: 'templates-from-production',
    publishedAt: '2026-09-10',
    updatedAt: '2026-09-10',
    locales: ['en', 'es'],
    tags: ['Open source', 'Software architecture design'],
  },
  {
    slug: 'typed-content-instead-of-markdown',
    publishedAt: '2026-09-10',
    updatedAt: '2026-09-10',
    locales: ['en', 'es'],
    tags: ['TypeScript', 'Internationalization', 'Next.js'],
  },
  {
    slug: 'building-for-answer-engines',
    publishedAt: '2026-09-10',
    updatedAt: '2026-09-10',
    locales: ['en', 'es'],
    tags: ['Technical SEO', 'Next.js'],
  },
]

export const postSlugs: readonly PostSlug[] = postMeta.map((post) => post.slug)

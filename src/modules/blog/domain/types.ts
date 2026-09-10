/**
 * Blog posts as typed data. The template this site is built on shipped a
 * Postgres-backed posts feature; a static portfolio does not need a database
 * to publish a handful of essays, so posts follow the same content-as-data
 * rule as everything else here and the whole blog prerenders.
 *
 * `description` is a required field on the post rather than a slice of the
 * body, because it is what a search engine and an answer engine read.
 */
export type PostBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: readonly string[] }

/** The post slugs, as a closed union — see the projects module for the reason. */
export type PostSlug =
  | 'templates-from-production'
  | 'typed-content-instead-of-markdown'
  | 'building-for-answer-engines'

export type PostMeta = {
  slug: PostSlug
  /** `YYYY-MM-DD`. */
  publishedAt: string
  /** `YYYY-MM-DD`. */
  updatedAt: string
  /**
   * Locales the post is published in. Narrows `hreflang` and the sitemap so
   * neither advertises a URL that would 404.
   */
  locales: readonly string[]
  tags: readonly string[]
}

export type PostCopy = {
  /** ≤ 60 characters, enforced at authoring time by a test. */
  title: string
  /** ≤ 155 characters, enforced at authoring time by a test. */
  description: string
  blocks: readonly PostBlock[]
}

export type Post = PostMeta & PostCopy

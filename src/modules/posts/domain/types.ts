import type { Locale } from '@/shared/i18n/config'

/** The DTO the UI receives. Never the raw row — no author email, no internals. */
export type PostSummary = {
  id: string
  slug: string
  locale: Locale
  title: string
  excerpt: string
  published: boolean
  publishedAt: Date | null
  updatedAt: Date
  authorName: string
}

export type PostDetail = PostSummary & { content: string; authorId: string }

export type Paginated<T> = {
  items: T[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export const POSTS_PAGE_SIZE = 10

/**
 * Wire shape. Dates do not survive the server→client boundary as `Date`
 * through JSON, so anything a client component or the REST route touches
 * uses ISO strings and one explicit conversion point.
 */
export type SerializedPost = Omit<PostSummary, 'publishedAt' | 'updatedAt'> & {
  publishedAt: string | null
  updatedAt: string
}

export function serializePost(post: PostSummary): SerializedPost {
  return {
    ...post,
    publishedAt: post.publishedAt?.toISOString() ?? null,
    updatedAt: post.updatedAt.toISOString(),
  }
}

export function serializePage(page: Paginated<PostSummary>): Paginated<SerializedPost> {
  return { ...page, items: page.items.map(serializePost) }
}

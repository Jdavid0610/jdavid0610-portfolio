import type { Locale } from '@/shared/i18n/config'
import type { Paginated, PostDetail, PostSummary } from '../domain/types'

/**
 * The port every posts repository implements. Declaring it explicitly — rather
 * than inferring it from the Postgres implementation — is what makes the mock
 * a peer instead of an afterthought: if a query changes shape, both
 * implementations fail to compile.
 */
export interface PostsRepository {
  /** Public reads are always scoped to the visitor's locale. */
  findPublished(locale: Locale, limit?: number): Promise<PostSummary[]>
  findPublishedSlugs(locale: Locale): Promise<string[]>
  findBySlug(slug: string, locale: Locale): Promise<PostDetail | null>
  /** Which locales this slug exists in — drives hreflang and the sitemap. */
  findLocalesForSlug(slug: string): Promise<Locale[]>
  findById(id: string): Promise<PostDetail | null>
  findByAuthor(
    authorId: string,
    filters: { search: string; page: number; status: 'all' | 'published' | 'draft' },
  ): Promise<Paginated<PostSummary>>
  slugExists(slug: string, locale: Locale, excludeId?: string): Promise<boolean>
  insertPost(values: {
    authorId: string
    locale: Locale
    title: string
    slug: string
    excerpt: string
    content: string
    published: boolean
  }): Promise<{ id: string; slug: string }>
  updatePost(
    id: string,
    values: {
      locale: Locale
      title: string
      slug: string
      excerpt: string
      content: string
      published: boolean
    },
    wasPublished: boolean,
  ): Promise<void>
  deletePost(id: string): Promise<void>
}

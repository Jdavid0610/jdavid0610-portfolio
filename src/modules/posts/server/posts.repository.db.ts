import 'server-only'

import { and, count, desc, eq, ilike, or, type SQL } from 'drizzle-orm'
import { db } from '@/server/db'
import { post, user } from '@/server/db/schema'
import type { Locale } from '@/shared/i18n/config'
import type { Paginated, PostDetail, PostSummary } from '../domain/types'
import { POSTS_PAGE_SIZE } from '../domain/types'

/**
 * The only file in the app that writes SQL.
 *
 * It returns DTOs rather than rows, so a schema change stops here instead of
 * rippling into services, actions and components.
 */
const summarySelection = {
  id: post.id,
  slug: post.slug,
  locale: post.locale,
  title: post.title,
  excerpt: post.excerpt,
  published: post.published,
  publishedAt: post.publishedAt,
  updatedAt: post.updatedAt,
  authorName: user.name,
}

export async function findPublished(locale: Locale, limit = 20): Promise<PostSummary[]> {
  return db
    .select(summarySelection)
    .from(post)
    .innerJoin(user, eq(post.authorId, user.id))
    .where(and(eq(post.published, true), eq(post.locale, locale)))
    .orderBy(desc(post.publishedAt))
    .limit(limit)
}

export async function findPublishedSlugs(locale: Locale): Promise<string[]> {
  const rows = await db
    .select({ slug: post.slug })
    .from(post)
    .where(and(eq(post.published, true), eq(post.locale, locale)))
    .orderBy(desc(post.publishedAt))
  return rows.map((row) => row.slug)
}

export async function findBySlug(slug: string, locale: Locale): Promise<PostDetail | null> {
  const [row] = await db
    .select({ ...summarySelection, content: post.content, authorId: post.authorId })
    .from(post)
    .innerJoin(user, eq(post.authorId, user.id))
    .where(and(eq(post.slug, slug), eq(post.locale, locale)))
    .limit(1)
  return row ?? null
}

/** Published translations of one slug. Empty means the post does not exist. */
export async function findLocalesForSlug(slug: string): Promise<Locale[]> {
  const rows = await db
    .select({ locale: post.locale })
    .from(post)
    .where(and(eq(post.slug, slug), eq(post.published, true)))
  return rows.map((row) => row.locale)
}

export async function findById(id: string): Promise<PostDetail | null> {
  const [row] = await db
    .select({ ...summarySelection, content: post.content, authorId: post.authorId })
    .from(post)
    .innerJoin(user, eq(post.authorId, user.id))
    .where(eq(post.id, id))
    .limit(1)
  return row ?? null
}

export async function findByAuthor(
  authorId: string,
  filters: { search: string; page: number; status: 'all' | 'published' | 'draft' },
): Promise<Paginated<PostSummary>> {
  const conditions: SQL[] = [eq(post.authorId, authorId)]

  if (filters.search) {
    const term = `%${filters.search}%`
    const match = or(ilike(post.title, term), ilike(post.excerpt, term))
    if (match) conditions.push(match)
  }
  if (filters.status !== 'all') {
    conditions.push(eq(post.published, filters.status === 'published'))
  }

  const where = and(...conditions)
  const offset = (filters.page - 1) * POSTS_PAGE_SIZE

  // One round-trip each: the page of rows, and the total for the pager.
  const [items, [totals]] = await Promise.all([
    db
      .select(summarySelection)
      .from(post)
      .innerJoin(user, eq(post.authorId, user.id))
      .where(where)
      .orderBy(desc(post.updatedAt))
      .limit(POSTS_PAGE_SIZE)
      .offset(offset),
    db.select({ value: count() }).from(post).where(where),
  ])

  const total = totals?.value ?? 0

  return {
    items,
    page: filters.page,
    pageSize: POSTS_PAGE_SIZE,
    total,
    totalPages: Math.max(1, Math.ceil(total / POSTS_PAGE_SIZE)),
  }
}

export async function slugExists(
  slug: string,
  locale: Locale,
  excludeId?: string,
): Promise<boolean> {
  const [row] = await db
    .select({ id: post.id })
    .from(post)
    .where(and(eq(post.slug, slug), eq(post.locale, locale)))
    .limit(1)
  return Boolean(row) && row?.id !== excludeId
}

export async function insertPost(values: {
  authorId: string
  locale: Locale
  title: string
  slug: string
  excerpt: string
  content: string
  published: boolean
}): Promise<{ id: string; slug: string }> {
  const [row] = await db
    .insert(post)
    .values({ ...values, publishedAt: values.published ? new Date() : null })
    .returning({ id: post.id, slug: post.slug })
  return row!
}

export async function updatePost(
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
): Promise<void> {
  await db
    .update(post)
    .set({
      ...values,
      // Stamp the publish date once, on the transition to published.
      publishedAt: values.published ? (wasPublished ? undefined : new Date()) : null,
    })
    .where(eq(post.id, id))
}

export async function deletePost(id: string): Promise<void> {
  await db.delete(post).where(eq(post.id, id))
}

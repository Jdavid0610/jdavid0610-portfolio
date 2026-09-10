import 'server-only'

import { randomUUID } from 'node:crypto'
import { mockOperation } from '@/server/mocks/config'
import type { Locale } from '@/shared/i18n/config'
import { POSTS_PAGE_SIZE, type PostDetail, type PostSummary } from '../domain/types'
import { postFixtures } from './posts.fixtures'
import type { PostsRepository } from './posts.repository.contract'

/**
 * In-memory implementation of the posts port.
 *
 * It is *stateful*: creating, editing and deleting all work, so the whole CRUD
 * flow — including optimistic deletion and slug conflicts — can be exercised
 * with no database. State is kept on `globalThis` so the dev server's hot
 * reloads do not reset it mid-session, and it resets on a real restart.
 */
const globalForMocks = globalThis as unknown as { __mockPosts?: PostDetail[] }

function store(): PostDetail[] {
  const existing = globalForMocks.__mockPosts
  if (existing) return existing

  const seeded = postFixtures.map((post): PostDetail => ({ ...post }))
  globalForMocks.__mockPosts = seeded
  return seeded
}

function toSummary({ content: _content, authorId: _authorId, ...summary }: PostDetail): PostSummary {
  return summary
}

function byNewest(a: PostDetail, b: PostDetail): number {
  return b.updatedAt.getTime() - a.updatedAt.getTime()
}

export const mockPostsRepository: PostsRepository = {
  findPublished: (locale, limit = 20) =>
    mockOperation('posts.findPublished', () =>
      store()
        .filter((post) => post.published && post.locale === locale)
        .sort((a, b) => (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0))
        .slice(0, limit)
        .map(toSummary),
    ),

  findPublishedSlugs: (locale) =>
    mockOperation('posts.findPublishedSlugs', () =>
      store()
        .filter((post) => post.published && post.locale === locale)
        .map((post) => post.slug),
    ),

  findBySlug: (slug, locale) =>
    mockOperation(
      'posts.findBySlug',
      () => store().find((post) => post.slug === slug && post.locale === locale) ?? null,
    ),

  findLocalesForSlug: (slug) =>
    mockOperation('posts.findLocalesForSlug', () =>
      store()
        .filter((post) => post.slug === slug && post.published)
        .map((post): Locale => post.locale),
    ),

  findById: (id) => mockOperation('posts.findById', () => store().find((post) => post.id === id) ?? null),

  findByAuthor: (authorId, filters) =>
    mockOperation('posts.list', () => {
      const term = filters.search.toLowerCase()
      const matches = store()
        .filter((post) => post.authorId === authorId)
        .filter(
          (post) =>
            !term ||
            post.title.toLowerCase().includes(term) ||
            post.excerpt.toLowerCase().includes(term),
        )
        .filter((post) =>
          filters.status === 'all' ? true : post.published === (filters.status === 'published'),
        )
        .sort(byNewest)

      const offset = (filters.page - 1) * POSTS_PAGE_SIZE

      return {
        items: matches.slice(offset, offset + POSTS_PAGE_SIZE).map(toSummary),
        page: filters.page,
        pageSize: POSTS_PAGE_SIZE,
        total: matches.length,
        totalPages: Math.max(1, Math.ceil(matches.length / POSTS_PAGE_SIZE)),
      }
    }),

  slugExists: (slug, locale, excludeId) =>
    mockOperation('posts.slugExists', () =>
      store().some((post) => post.slug === slug && post.locale === locale && post.id !== excludeId),
    ),

  insertPost: (values) =>
    mockOperation('posts.create', () => {
      const now = new Date()
      const created: PostDetail = {
        ...values,
        id: randomUUID(),
        publishedAt: values.published ? now : null,
        updatedAt: now,
        authorName: 'Mock Author',
      }
      store().unshift(created)
      return { id: created.id, slug: created.slug }
    }),

  updatePost: (id, values, wasPublished) =>
    mockOperation('posts.update', () => {
      const existing = store().find((post) => post.id === id)
      if (!existing) return
      Object.assign(existing, values, {
        updatedAt: new Date(),
        publishedAt: values.published ? (wasPublished ? existing.publishedAt : new Date()) : null,
      })
    }),

  deletePost: (id) =>
    mockOperation('posts.delete', () => {
      const posts = store()
      const index = posts.findIndex((post) => post.id === id)
      if (index >= 0) posts.splice(index, 1)
    }),
}

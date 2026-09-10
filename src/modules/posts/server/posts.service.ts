import 'server-only'

import { ForbiddenError, NotFoundError, ValidationError } from '@/server/errors'
import type { Locale } from '@/shared/i18n/config'
import type { Session } from '@/server/auth/session'
import type { CreatePostInput, PostFilters, UpdatePostInput } from '../domain/schemas'
import type { Paginated, PostDetail, PostSummary } from '../domain/types'
import * as repo from './posts.repository'

/**
 * Business rules and authorization. Actions and route handlers are thin
 * because every ownership check lives here, next to the data it protects.
 */
function assertCanEdit(session: Session, resource: { authorId: string }): void {
  const isOwner = resource.authorId === session.user.id
  const isAdmin = session.user.role === 'admin'
  if (!isOwner && !isAdmin) throw new ForbiddenError('error.postForbidden')
}

export async function listPublished(locale: Locale, limit?: number): Promise<PostSummary[]> {
  return repo.findPublished(locale, limit)
}

export async function listPublishedSlugs(locale: Locale): Promise<string[]> {
  return repo.findPublishedSlugs(locale)
}

/**
 * Public read: an unpublished post must 404 rather than leak a draft, and a
 * post written in another language must 404 on this locale rather than serve
 * English content under a Spanish URL.
 */
export async function getPublishedBySlug(slug: string, locale: Locale): Promise<PostDetail> {
  const found = await repo.findBySlug(slug, locale)
  if (!found || !found.published) throw new NotFoundError('error.postNotFound')
  return found
}

/**
 * The locales a published post exists in. hreflang must only advertise
 * translations that are really there — pointing at a 404 is worse than
 * declaring nothing.
 */
export async function listTranslations(slug: string): Promise<Locale[]> {
  return repo.findLocalesForSlug(slug)
}

export async function listMine(
  session: Session,
  filters: PostFilters,
): Promise<Paginated<PostSummary>> {
  return repo.findByAuthor(session.user.id, filters)
}

export async function getForEdit(session: Session, id: string): Promise<PostDetail> {
  const found = await repo.findById(id)
  if (!found) throw new NotFoundError('error.postNotFound')
  assertCanEdit(session, found)
  return found
}

export async function create(
  session: Session,
  input: CreatePostInput,
): Promise<{ id: string; slug: string }> {
  if (await repo.slugExists(input.slug, input.locale)) {
    throw new ValidationError('error.slugTaken', { slug: ['error.slugTakenField'] })
  }
  return repo.insertPost({ ...input, authorId: session.user.id })
}

export async function update(
  session: Session,
  input: UpdatePostInput,
): Promise<{ slug: string; locale: Locale }> {
  const existing = await repo.findById(input.id)
  if (!existing) throw new NotFoundError('error.postNotFound')
  assertCanEdit(session, existing)

  if (await repo.slugExists(input.slug, input.locale, input.id)) {
    throw new ValidationError('error.slugTaken', { slug: ['error.slugTakenField'] })
  }

  const { id, ...values } = input
  await repo.updatePost(id, values, existing.published)
  return { slug: values.slug, locale: values.locale }
}

export async function remove(session: Session, id: string): Promise<void> {
  const existing = await repo.findById(id)
  if (!existing) throw new NotFoundError('error.postNotFound')
  assertCanEdit(session, existing)
  await repo.deletePost(id)
}

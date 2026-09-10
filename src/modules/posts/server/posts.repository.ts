import 'server-only'

import { isMockMode } from '@/server/mocks/config'
import * as postgres from './posts.repository.db'
import { mockPostsRepository } from './posts.repository.mock'
import type { PostsRepository } from './posts.repository.contract'

/**
 * The swap point.
 *
 * Everything above this file — services, actions, route handlers, pages —
 * imports from here and cannot tell which implementation it is talking to.
 * That is the whole design: mock mode is a boot-time decision made in exactly
 * one place, not a conditional sprinkled through the application.
 */
const impl: PostsRepository = isMockMode() ? mockPostsRepository : postgres

export const findPublished: PostsRepository['findPublished'] = (locale, limit) =>
  impl.findPublished(locale, limit)
export const findPublishedSlugs: PostsRepository['findPublishedSlugs'] = (locale) =>
  impl.findPublishedSlugs(locale)
export const findBySlug: PostsRepository['findBySlug'] = (slug, locale) =>
  impl.findBySlug(slug, locale)
export const findLocalesForSlug: PostsRepository['findLocalesForSlug'] = (slug) =>
  impl.findLocalesForSlug(slug)
export const findById: PostsRepository['findById'] = (id) => impl.findById(id)
export const findByAuthor: PostsRepository['findByAuthor'] = (authorId, filters) =>
  impl.findByAuthor(authorId, filters)
export const slugExists: PostsRepository['slugExists'] = (slug, locale, excludeId) =>
  impl.slugExists(slug, locale, excludeId)
export const insertPost: PostsRepository['insertPost'] = (values) => impl.insertPost(values)
export const updatePost: PostsRepository['updatePost'] = (id, values, wasPublished) =>
  impl.updatePost(id, values, wasPublished)
export const deletePost: PostsRepository['deletePost'] = (id) => impl.deletePost(id)

export type { PostsRepository }

import { isLocale, locales, type Locale } from '@/shared/i18n/config'
import type { Post, PostCopy, PostSlug } from '../domain/types'
import { postsEn } from './en'
import { postsEs } from './es'
import { postMeta, postSlugs } from './meta'

const copy: Record<Locale, Record<PostSlug, PostCopy>> = { en: postsEn, es: postsEs }

/** Newest first. Only posts published in the requested locale are returned. */
export function getPosts(locale: Locale): Post[] {
  return postMeta
    .filter((meta) => meta.locales.includes(locale))
    .map((meta) => ({ ...meta, ...copy[locale][meta.slug] }))
}

export function getPost(locale: Locale, slug: string): Post | null {
  const meta = postMeta.find((post) => post.slug === slug)
  if (!meta || !meta.locales.includes(locale)) return null
  return { ...meta, ...copy[locale][meta.slug] }
}

/** Slugs published in a given locale, for `generateStaticParams`. */
export function postSlugsFor(locale: Locale): PostSlug[] {
  return postMeta.filter((meta) => meta.locales.includes(locale)).map((meta) => meta.slug)
}

/**
 * The locales a post actually exists in, narrowed to the ones this site
 * serves. `buildMetadata` and the sitemap both need it: an hreflang pointing
 * at a 404 is worse than declaring nothing.
 */
export function postLocales(slug: string): Locale[] {
  const meta = postMeta.find((post) => post.slug === slug)
  if (!meta) return []
  return meta.locales.filter(isLocale).filter((locale) => locales.includes(locale))
}

export { postMeta, postSlugs }

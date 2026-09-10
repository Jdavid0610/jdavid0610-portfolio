import type { Locale } from '@/shared/i18n/config'
import type { DocPage, DocsContent } from '../domain/types'
import { docsEn } from './en'
import { docsEs } from './es'

const content: Record<Locale, DocsContent> = { en: docsEn, es: docsEs }

export function getDocs(locale: Locale): DocsContent {
  return content[locale]
}

export function getDocPage(locale: Locale, slug: string): DocPage | null {
  return content[locale].pages.find((page) => page.slug === slug) ?? null
}

/**
 * Slugs are shared across locales by construction — every locale ships the
 * same pages — so one list drives `generateStaticParams` and the sitemap.
 */
export function docSlugs(): string[] {
  return docsEn.pages.map((page) => page.slug)
}

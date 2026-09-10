import type { Locale } from '@/shared/i18n/config'

/**
 * Every internal path in one place, locale-aware by construction. Nothing in
 * the app hardcodes a URL string, so adding a segment is a one-line change.
 */
export const routes = {
  home: (l: Locale) => `/${l}`,
  about: (l: Locale) => `/${l}/about`,
  projects: (l: Locale) => `/${l}/projects`,
  project: (l: Locale, slug: string) => `/${l}/projects/${slug}`,
  openSource: (l: Locale) => `/${l}/open-source`,
  template: (l: Locale, slug: string) => `/${l}/open-source/${slug}`,
  experience: (l: Locale) => `/${l}/experience`,
  faq: (l: Locale) => `/${l}/faq`,
  contact: (l: Locale) => `/${l}/contact`,
  blog: (l: Locale) => `/${l}/blog`,
  blogPost: (l: Locale, slug: string) => `/${l}/blog/${slug}`,
} as const

/** Absolute URL for a locale-aware path. Used by JSON-LD and `llms.txt`. */
export function absolute(base: string, path: string): string {
  return `${base}${path}`
}

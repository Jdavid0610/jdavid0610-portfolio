import type { Locale } from '@/shared/i18n/config'

/**
 * Every internal path in one place, locale-aware by construction. Nothing in
 * the app hardcodes a URL string, so adding a segment is a one-line change.
 */
export const routes = {
  home: (l: Locale) => `/${l}`,
  blog: (l: Locale) => `/${l}/blog`,
  docs: (l: Locale) => `/${l}/docs`,
  docPage: (l: Locale, slug: string) => `/${l}/docs/${slug}`,
  blogPost: (l: Locale, slug: string) => `/${l}/blog/${slug}`,
  signIn: (l: Locale, callbackUrl?: string) =>
    callbackUrl ? `/${l}/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}` : `/${l}/sign-in`,
  signUp: (l: Locale) => `/${l}/sign-up`,
  dashboard: (l: Locale) => `/${l}/dashboard`,
  posts: (l: Locale) => `/${l}/posts`,
  newPost: (l: Locale) => `/${l}/posts/new`,
  editPost: (l: Locale, id: string) => `/${l}/posts/${id}/edit`,
  settings: (l: Locale) => `/${l}/settings/profile`,
  admin: (l: Locale) => `/${l}/admin`,
} as const

/** Prefixes that require a session — read by the proxy for optimistic redirects. */
export const protectedSegments = ['dashboard', 'posts', 'settings', 'admin'] as const

/** Auth pages a signed-in user should be bounced away from. */
export const authOnlySegments = ['sign-in', 'sign-up', 'forgot-password'] as const

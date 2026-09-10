import { siteConfig } from '@/shared/config/site'
import type { Locale } from '@/shared/i18n/config'
import type { Dictionary } from '@/shared/i18n/dictionaries/en'
import { routes } from '@/shared/lib/routes'

export type Crumb = { name: string; url: string }

/**
 * Builds an absolute breadcrumb trail, always rooted at the locale home. Used
 * for both the visible breadcrumb and the `BreadcrumbList` block, so the two
 * cannot disagree.
 */
export function breadcrumbs(
  locale: Locale,
  t: Dictionary,
  trail: ReadonlyArray<{ name: string; path: string }>,
): Crumb[] {
  return [
    { name: t.nav.home, url: `${siteConfig.url}${routes.home(locale)}` },
    ...trail.map((item) => ({ name: item.name, url: `${siteConfig.url}${item.path}` })),
  ]
}

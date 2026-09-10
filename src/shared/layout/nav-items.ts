import type { Dictionary } from '@/shared/i18n/dictionaries/en'
import type { Locale } from '@/shared/i18n/config'
import { routes } from '@/shared/lib/routes'

export type NavItem = {
  href: string
  label: string
  /**
   * Whether the item earns a slot in the desktop bar. All seven pages belong
   * in the drawer and the footer, but seven links across a header reads as a
   * sitemap; the four that carry the pitch are promoted and the rest stay one
   * tap away.
   */
  primary?: boolean
}

/**
 * One navigation list, shared by the header, the mobile drawer and the
 * footer, so a new page appears in all three at once.
 */
export function navItems(locale: Locale, t: Dictionary): NavItem[] {
  return [
    { href: routes.projects(locale), label: t.nav.projects, primary: true },
    { href: routes.openSource(locale), label: t.nav.openSource, primary: true },
    { href: routes.experience(locale), label: t.nav.experience, primary: true },
    { href: routes.about(locale), label: t.nav.about, primary: true },
    { href: routes.blog(locale), label: t.nav.blog },
    { href: routes.faq(locale), label: t.nav.faq },
    { href: routes.contact(locale), label: t.nav.contact },
  ]
}

/** The subset the desktop header shows. */
export function primaryNavItems(locale: Locale, t: Dictionary): NavItem[] {
  return navItems(locale, t).filter((item) => item.primary)
}

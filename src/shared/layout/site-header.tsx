import Link from 'next/link'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import type { Locale } from '@/shared/i18n/config'
import { routes } from '@/shared/lib/routes'
import { siteConfig } from '@/shared/config/site'
import { LocaleSwitcher } from './locale-switcher'
import { MobileNav } from './mobile-nav'
import { PrimaryNav } from './primary-nav'
import { ThemeToggle } from './theme-toggle'
import { navItems, primaryNavItems } from './nav-items'

/**
 * Server-rendered and free of any session or header read, so every route below
 * it stays prerendered. Three small islands hydrate on top: the link row (for
 * `aria-current`), the theme toggle and the drawer.
 *
 * The monogram replaces the wordmark it used to render. A two-letter mark on
 * the brand gradient survives being shrunk to a favicon, and it gives the
 * header something that is his rather than the template's.
 */
export function SiteHeader({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/80 backdrop-blur-lg">
      <div className="mx-auto flex h-[4.625rem] max-w-3xl items-center gap-6 px-4 lg:max-w-5xl">
        <Link href={routes.home(locale)} className="group flex shrink-0 items-center gap-3">
          <span aria-hidden className="mark-badge size-[2.125rem] font-display text-[0.8125rem] font-bold">
            JO
          </span>
          <span className="font-display text-[0.9375rem] font-bold tracking-tight">
            {siteConfig.shortName}
          </span>
        </Link>

        <PrimaryNav items={primaryNavItems(locale, t)} label={t.nav.primaryLabel} />

        <div className="ml-auto flex shrink-0 items-center gap-2.5">
          <div className="hidden sm:block">
            <LocaleSwitcher current={locale} />
          </div>
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <Link href={routes.contact(locale)} className="cta hidden md:inline-flex">
            {t.nav.hireMe}
          </Link>
          <MobileNav items={navItems(locale, t)} locale={locale} />
        </div>
      </div>
    </header>
  )
}

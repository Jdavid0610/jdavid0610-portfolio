import Link from 'next/link'
import type { ReactNode } from 'react'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import type { Locale } from '@/shared/i18n/config'
import { routes } from '@/shared/lib/routes'
import { siteConfig } from '@/shared/config/site'
import { LocaleSwitcher } from './locale-switcher'

/**
 * The header takes its auth corner as a slot instead of reading the session
 * itself. That is what lets the same header sit on a statically prerendered
 * marketing page and on a per-request authenticated page:
 *
 *   marketing → <AuthActions />        (client, keeps the route static)
 *   app       → <UserMenu user={…} />  (server, already dynamic)
 */
export function SiteHeader({ locale, auth }: { locale: Locale; auth: ReactNode }) {
  const t = getDictionary(locale)

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center gap-6 px-4">
        <Link href={routes.home(locale)} className="font-semibold">
          {siteConfig.name}
        </Link>

        <nav className="hidden gap-4 text-sm text-muted sm:flex">
          <Link href={routes.blog(locale)} className="hover:text-fg">
            {t.nav.blog}
          </Link>
          <Link href={routes.docs(locale)} className="hover:text-fg">
            {t.nav.docs}
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <LocaleSwitcher current={locale} />
          {auth}
        </div>
      </div>
    </header>
  )
}

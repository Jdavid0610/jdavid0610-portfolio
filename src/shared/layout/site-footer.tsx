import Link from 'next/link'
import type { Locale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { routes } from '@/shared/lib/routes'
import { siteConfig } from '@/shared/config/site'

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <nav className="flex gap-4 sm:ml-auto">
          <Link href={routes.home(locale)} className="hover:text-fg">
            {t.nav.home}
          </Link>
          <Link href={routes.blog(locale)} className="hover:text-fg">
            {t.nav.blog}
          </Link>
          <Link href={routes.docs(locale)} className="hover:text-fg">
            {t.nav.docs}
          </Link>
        </nav>
      </div>
    </footer>
  )
}

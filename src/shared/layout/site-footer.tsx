import Link from 'next/link'
import type { Locale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { routes } from '@/shared/lib/routes'
import { siteConfig } from '@/shared/config/site'
import { navItems } from './nav-items'

/**
 * The phone number is deliberately absent here and appears only on `/contact`.
 * The email is a real, unobfuscated `mailto:` because an answer engine has to
 * be able to read it.
 */
export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const items = navItems(locale, t)

  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12 lg:max-w-5xl">
        <nav aria-label={t.nav.footerLabel}>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 text-sm text-faint sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-1">
            <p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-muted underline decoration-border underline-offset-4 transition hover:text-fg"
              >
                {siteConfig.email}
              </a>
            </p>
            <p>
              <a
                href={siteConfig.profiles.github}
                rel="me noopener"
                className="text-muted transition hover:text-fg"
              >
                GitHub
              </a>
              <span aria-hidden> · </span>
              <a
                href={siteConfig.profiles.linkedin}
                rel="me noopener"
                className="text-muted transition hover:text-fg"
              >
                LinkedIn
              </a>
            </p>
          </div>

          <div className="flex flex-col gap-1 sm:items-end">
            <p>
              {t.footer.builtOnPrefix}{' '}
              <Link
                href={routes.template(locale, siteConfig.builtOn.name)}
                className="font-mono text-muted underline decoration-border underline-offset-4 transition hover:text-fg"
              >
                {siteConfig.builtOn.name}
              </Link>
              {t.footer.builtOnSuffix}
            </p>
            <p>
              © {new Date().getFullYear()} {siteConfig.fullName}. {t.footer.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

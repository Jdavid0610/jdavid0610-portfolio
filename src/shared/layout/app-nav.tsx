'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from '@/shared/i18n/i18n-provider'
import { cn } from '@/shared/lib/cn'
import { routes } from '@/shared/lib/routes'

/**
 * Client component only because it highlights the active route from
 * `usePathname()`. Everything else in the app shell stays server-rendered.
 */
export function AppNav({ isAdmin }: { isAdmin: boolean }) {
  const t = useTranslations()
  const locale = useLocale()
  const pathname = usePathname()

  const items = [
    { href: routes.dashboard(locale), label: t.common.dashboard },
    { href: routes.posts(locale), label: t.nav.posts },
    { href: routes.settings(locale), label: t.nav.settings },
    ...(isAdmin ? [{ href: routes.admin(locale), label: t.nav.admin }] : []),
  ]

  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-border">
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              '-mb-px border-b-2 px-4 py-3 text-sm whitespace-nowrap transition',
              isActive
                ? 'border-brand font-medium text-fg'
                : 'border-transparent text-muted hover:text-fg',
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

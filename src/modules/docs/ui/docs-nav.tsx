'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale } from '@/shared/i18n/i18n-provider'
import { cn } from '@/shared/lib/cn'
import { routes } from '@/shared/lib/routes'
import type { DocPage } from '../domain/types'

/**
 * Client component only because it highlights the current page from the
 * pathname; the content it lists was rendered on the server.
 */
export function DocsNav({ pages }: { pages: Array<Pick<DocPage, 'slug' | 'title'>> }) {
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <nav aria-label="Documentation" className="flex flex-col gap-1">
      {pages.map((page) => {
        const href = routes.docPage(locale, page.slug)
        const isActive = pathname === href
        return (
          <Link
            key={page.slug}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'rounded-lg px-3 py-2 text-sm transition',
              isActive ? 'bg-surface font-medium text-fg' : 'text-muted hover:text-fg',
            )}
          >
            {page.title}
          </Link>
        )
      })}
    </nav>
  )
}

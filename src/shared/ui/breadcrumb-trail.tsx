import Link from 'next/link'
import { siteConfig } from '@/shared/config/site'
import type { Crumb } from '@/shared/lib/breadcrumbs'

/**
 * The visible counterpart of the `BreadcrumbList` block. The last crumb is the
 * current page, so it is rendered as text rather than a link.
 */
export function BreadcrumbTrail({ items, label }: { items: readonly Crumb[]; label: string }) {
  return (
    <nav aria-label={label}>
      <ol className="flex flex-wrap items-center gap-1 text-xs text-faint">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const href = item.url.replace(siteConfig.url, '')
          return (
            <li key={item.url} className="flex items-center gap-1">
              {isLast ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <>
                  <Link href={href} className="transition hover:text-fg">
                    {item.name}
                  </Link>
                  <span aria-hidden>/</span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

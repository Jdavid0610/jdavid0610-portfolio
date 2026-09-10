'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { NavItem } from './nav-items'

/**
 * The desktop link row. It is a client component only so that it can mark the
 * current section with `aria-current` — which is what the accent rail in
 * `globals.css` is keyed on, so the styling follows the accessibility tree
 * instead of a parallel `isActive` class.
 *
 * Section pages count as their index's descendants, so `/projects/clinpsia`
 * keeps "Projects" lit.
 */
export function PrimaryNav({ items, label }: { items: NavItem[]; label: string }) {
  const pathname = usePathname()

  return (
    <nav aria-label={label} className="hidden min-w-0 md:block">
      <ul className="flex items-center gap-1 text-sm">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className="nav-link block"
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

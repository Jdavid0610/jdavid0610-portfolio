'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'
import { useDisclosure } from '@/shared/hooks/use-disclosure'
import { useTranslations } from '@/shared/i18n/i18n-provider'
import type { Locale } from '@/shared/i18n/config'
import { siteConfig } from '@/shared/config/site'
import { LocaleSwitcher } from './locale-switcher'
import { ThemeToggle } from './theme-toggle'
import type { NavItem } from './nav-items'

/**
 * On a phone the header has room for a mark and one control, so navigation
 * becomes a drawer rather than a squeezed bar: full-height, sliding in from the
 * trailing edge over a blurred scrim, with 50px rows that are comfortable
 * touch targets.
 *
 * It is a real modal — `aria-modal`, Escape to dismiss, the background locked
 * against scroll and focus moved into the panel — because a drawer that leaves
 * the page scrolling behind it feels broken on iOS.
 *
 * The overlay is portalled to `document.body` rather than rendered in place.
 * The header sets `backdrop-filter`, which makes it a containing block for
 * fixed-position descendants: rendered inline, the panel resolved `inset: 0`
 * against the 74px header instead of the viewport and collapsed to a strip.
 */
export function MobileNav({ items, locale }: { items: NavItem[]; locale: Locale }) {
  const t = useTranslations()
  const { isOpen, toggle, close } = useDisclosure()
  const pathname = usePathname()
  const panelRef = useRef<HTMLDivElement>(null)

  // A navigation that stays open after navigating is a trap on a phone.
  useEffect(close, [pathname, close])

  useEffect(() => {
    if (!isOpen) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') close()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    panelRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, close])

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        className="flex size-11 flex-col items-center justify-center gap-[5px] rounded-[0.6875rem] border border-border bg-surface transition hover:border-border-strong"
      >
        <span className="sr-only">{isOpen ? t.common.close : t.common.menu}</span>
        <span aria-hidden className="block h-[1.6px] w-[17px] rounded bg-fg" />
        <span aria-hidden className="block h-[1.6px] w-[17px] rounded bg-fg" />
        <span aria-hidden className="block h-[1.6px] w-[17px] rounded bg-fg" />
      </button>

      {isOpen
        ? createPortal(
            <>
              {/* Dismisses on tap. The button above is the keyboard-reachable close. */}
              <div aria-hidden className="drawer-scrim z-40" onClick={close} />

              <div
                id="mobile-nav"
                ref={panelRef}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-label={t.nav.primaryLabel}
                className="drawer-panel z-50"
              >
                <div className="flex h-[4.625rem] shrink-0 items-center border-b border-border px-4 pl-[1.125rem]">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.09em] text-faint">
                    {t.common.menu}
                  </span>
                  <button
                    type="button"
                    onClick={close}
                    className="ml-auto grid size-11 place-items-center rounded-[0.6875rem] border border-transparent text-muted transition hover:rotate-90 hover:border-border hover:text-fg"
                  >
                    <span className="sr-only">{t.common.close}</span>
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      className="size-[18px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    >
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </div>

                <nav aria-label={t.nav.primaryLabel} className="min-h-0 overflow-y-auto px-2.5 py-3">
                  <ul className="flex flex-col gap-0.5">
                    {items.map((item, index) => {
                      const isActive =
                        pathname === item.href || pathname.startsWith(`${item.href}/`)
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            aria-current={isActive ? 'page' : undefined}
                            className="drawer-item"
                          >
                            <span aria-hidden className="w-4 font-mono text-[0.625rem] text-faint">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className="font-display text-base font-medium tracking-tight">
                              {item.label}
                            </span>
                            <span aria-hidden className="drawer-chevron">
                              <svg
                                viewBox="0 0 24 24"
                                className="size-3.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              >
                                <path d="M9 6l6 6-6 6" />
                              </svg>
                            </span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </nav>

                <div className="mt-auto shrink-0 border-t border-border px-[1.125rem] pb-5 pt-4">
                  <LocaleSwitcher current={locale} block />

                  <div className="mt-3 flex items-center gap-2.5">
                    <ThemeToggle />
                    <a
                      href={siteConfig.profiles.github}
                      rel="me noopener"
                      className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-[0.625rem] border border-border font-mono text-[0.65625rem] uppercase tracking-[0.04em] text-muted transition hover:border-border-strong hover:text-fg"
                    >
                      <svg aria-hidden viewBox="0 0 24 24" className="size-3.5" fill="currentColor">
                        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
                      </svg>
                      GitHub
                    </a>
                  </div>

                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="mt-3 block font-mono text-[0.65625rem] text-faint transition hover:text-fg"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </>,
            document.body,
          )
        : null}
    </div>
  )
}

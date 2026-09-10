'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { isLocale, localeNames, locales, type Locale } from '@/shared/i18n/config'
import { cn } from '@/shared/lib/cn'
import { setCookie } from '@/shared/lib/cookies'

/**
 * Swaps the locale segment in place, so the user stays on the page they were
 * reading, and remembers the choice for the proxy's next negotiation.
 */
export function LocaleSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function switchTo(next: Locale) {
    const segments = pathname.split('/')
    if (isLocale(segments[1])) segments[1] = next
    else segments.splice(1, 0, next)

    // A year is plenty: the proxy only reads this when no locale is in the URL.
    setCookie('locale', next, 60 * 60 * 24 * 365)
    startTransition(() => router.push(segments.join('/') || `/${next}`))
  }

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language">
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          disabled={isPending}
          onClick={() => switchTo(locale)}
          aria-current={locale === current ? 'true' : undefined}
          title={localeNames[locale]}
          className={cn(
            'rounded px-2 py-1 text-xs font-medium uppercase transition',
            locale === current ? 'bg-border text-fg' : 'text-muted hover:text-fg',
          )}
        >
          {locale}
        </button>
      ))}
    </div>
  )
}

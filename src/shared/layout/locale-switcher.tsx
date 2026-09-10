'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { isLocale, localeNames, locales, type Locale } from '@/shared/i18n/config'
import { cn } from '@/shared/lib/cn'
import { setCookie } from '@/shared/lib/cookies'

/**
 * Swaps the locale segment in place, so the user stays on the page they were
 * reading, and remembers the choice for the proxy's next negotiation.
 *
 * Rendered as a segmented control rather than a pair of loose buttons: with two
 * options, showing both and marking the live one is one tap and needs no
 * explanation, where a select needs a tap to reveal what it even contains.
 */
export function LocaleSwitcher({
  current,
  /** Fills its container — the drawer footer wants a full-width control. */
  block = false,
}: {
  current: Locale
  block?: boolean
}) {
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
    <div className={cn('seg', block && 'w-full')} role="group" aria-label="Language">
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          disabled={isPending}
          onClick={() => switchTo(locale)}
          aria-current={locale === current ? 'true' : undefined}
          title={localeNames[locale]}
          className={cn('seg-item uppercase', block && 'flex-1 py-2.5 text-center')}
        >
          {locale}
        </button>
      ))}
    </div>
  )
}

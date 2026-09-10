'use client'

import type { ReactNode } from 'react'
import { I18nProvider } from '@/shared/i18n/i18n-provider'
import { Toaster } from '@/shared/ui/toaster'
import type { Locale } from '@/shared/i18n/config'
import type { Dictionary } from '@/shared/i18n/dictionaries/en'

/**
 * All client-side context in one place, mounted once by the root layout.
 *
 * The site is fully prerendered from typed content and fetches nothing at
 * runtime, so there is no server-state cache to provide — only the i18n
 * dictionary and the toast mount point.
 */
export function Providers({
  locale,
  dictionary,
  children,
}: {
  locale: Locale
  dictionary: Dictionary
  children: ReactNode
}) {
  return (
    <I18nProvider value={{ locale, dictionary }}>
      {children}
      {/* Mounted once, above every route: `toast()` needs no local wiring. */}
      <Toaster />
    </I18nProvider>
  )
}

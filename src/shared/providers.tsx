'use client'

import { useState, type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nProvider } from '@/shared/i18n/i18n-provider'
import { Toaster } from '@/shared/ui/toaster'
import type { Locale } from '@/shared/i18n/config'
import type { Dictionary } from '@/shared/i18n/dictionaries/en'

/**
 * All client-side context in one place, mounted once by the root layout.
 *
 * The QueryClient is created inside state so each browser session — and each
 * SSR pass — gets its own cache instead of sharing one module-level client
 * across requests on the server.
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
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data already arrived with the HTML; don't refetch it immediately.
            staleTime: 60_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider value={{ locale, dictionary }}>
        {children}
        {/* Mounted once, above every route: `toast()` needs no local wiring. */}
        <Toaster />
      </I18nProvider>
    </QueryClientProvider>
  )
}

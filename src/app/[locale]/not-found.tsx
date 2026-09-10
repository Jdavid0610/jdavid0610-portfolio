'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from '@/shared/i18n/i18n-provider'
import { routes } from '@/shared/lib/routes'
import { Button } from '@/shared/ui/button'

/**
 * Client component on purpose: `not-found` is part of every route's tree, so
 * reading `headers()` here would make the entire site render dynamically. The
 * locale comes from the provider the root layout already mounted.
 */
export default function NotFound() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-6xl font-bold text-muted">404</p>
      <h1 className="text-2xl font-semibold">{t.errors.notFoundTitle}</h1>
      <p className="text-muted">{t.errors.notFoundBody}</p>
      <Link href={routes.home(locale)}>
        <Button>{t.errors.backHome}</Button>
      </Link>
    </main>
  )
}

'use client'

import { useEffect } from 'react'
import { useTranslations } from '@/shared/i18n/i18n-provider'
import { Button } from '@/shared/ui/button'

/**
 * Route-level error boundary. It receives the error's `digest`, which is the
 * only thing safe to show: the message itself is scrubbed in production.
 */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations()

  useEffect(() => {
    // Replace with your error reporter (Sentry, Axiom, …).
    console.error('[route error]', error)
  }, [error])

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold">{t.errors.genericTitle}</h1>
      <p className="text-muted">{t.errors.genericBody}</p>
      {error.digest ? <code className="text-xs text-muted">{error.digest}</code> : null}
      <Button onClick={reset}>{t.common.retry}</Button>
    </main>
  )
}

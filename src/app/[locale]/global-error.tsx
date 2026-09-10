'use client'

/**
 * Catches failures in the root layout itself, so it has to render its own
 * <html>/<body> — no providers, no dictionary, no styles guaranteed.
 *
 * This is the one screen in the app that cannot be translated: the layout that
 * mounts the i18n provider is precisely what failed. English is the deliberate
 * fallback, and the digest is what actually matters here.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: 'system-ui, sans-serif',
          display: 'grid',
          placeItems: 'center',
          minHeight: '100dvh',
          margin: 0,
          textAlign: 'center',
        }}
      >
        <main>
          <h1>Something went wrong</h1>
          <p style={{ opacity: 0.7 }}>The application failed to start this page.</p>
          {error.digest ? <code style={{ fontSize: 12, opacity: 0.6 }}>{error.digest}</code> : null}
          <p>
            <button onClick={reset} style={{ padding: '8px 16px', marginTop: 12 }}>
              Try again
            </button>
          </p>
        </main>
      </body>
    </html>
  )
}

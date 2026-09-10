import 'server-only'

import { AppError } from '@/server/errors'
import { env } from '@/server/env'
import { isMockModeEnabled } from '@/shared/lib/mock-mode'

/**
 * Mock mode runs the whole application against in-memory data: no Postgres, no
 * session store, no network. It exists for three jobs — onboarding a developer
 * in one command, exercising loading and error states on demand, and giving
 * end-to-end tests a deterministic backend.
 *
 * Two rules keep it safe:
 *   1. It is a *server* decision, read from the environment at boot, never
 *      from a request header or query parameter a visitor could set.
 *   2. It refuses to start in production unless someone opted in explicitly
 *      (`ALLOW_MOCKS_IN_PRODUCTION=true`), which a deploy pipeline can grep for.
 */
export function isMockMode(): boolean {
  return isMockModeEnabled()
}

if (isMockModeEnabled() && env.NODE_ENV === 'production' && !env.ALLOW_MOCKS_IN_PRODUCTION) {
  throw new Error(
    'MOCK_MODE is on in a production build. Real users would see fabricated data. ' +
      'Unset NEXT_PUBLIC_MOCK_MODE, or set ALLOW_MOCKS_IN_PRODUCTION=true if this is a demo deployment.',
  )
}

/**
 * Simulated latency. Real infrastructure is never instant, and a UI built
 * against a zero-latency backend hides every missing skeleton and spinner.
 */
export async function mockDelay(): Promise<void> {
  const ms = env.MOCK_LATENCY_MS
  if (ms > 0) await new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Deterministic failure injection, so error boundaries and retry paths can be
 * demonstrated without unplugging anything:
 *
 *   MOCK_FAIL="posts.create,posts.list"
 */
export function assertOperationSucceeds(operation: string): void {
  if (env.MOCK_FAIL.includes(operation)) {
    throw new AppError(`Mock failure injected for "${operation}".`, 'mock_failure', 500)
  }
}

/** The single helper every mock repository call is wrapped in. */
export async function mockOperation<T>(operation: string, run: () => T | Promise<T>): Promise<T> {
  await mockDelay()
  assertOperationSucceeds(operation)
  return run()
}

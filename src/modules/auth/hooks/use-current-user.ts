'use client'

import { useSyncExternalStore } from 'react'

import { readCookie } from '@/shared/lib/cookies'
import { authClient } from '../lib/auth-client'
import {
  isMockModeEnabled,
  MOCK_IDENTITIES,
  MOCK_SESSION_COOKIE,
  type MockIdentityKey,
} from '@/shared/lib/mock-mode'
import type { SessionUser } from '../domain/types'

/**
 * Client-side session read, used only on statically rendered pages.
 *
 * Reading the session on the server makes a route dynamic, which would cost
 * the marketing pages their static/ISR rendering for the sake of a header
 * button. Authenticated pages do the opposite and read it on the server.
 */
export function useCurrentUser(): { user: SessionUser | null; isPending: boolean } {
  const mock = useMockUser()
  const { data, isPending } = authClient.useSession()

  // `isMockModeEnabled()` is a build-time constant, so the hook order is stable.
  if (isMockModeEnabled()) return mock

  return {
    isPending,
    user: data?.user
      ? {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          image: data.user.image ?? null,
          role: (data.user.role as SessionUser['role']) ?? 'user',
        }
      : null,
  }
}

/**
 * Mock mode has no auth endpoint to query, so the client reads the same cookie
 * the server does.
 *
 * `useSyncExternalStore` rather than an effect: the cookie *is* external state,
 * and the server snapshot lets the first paint render a placeholder instead of
 * guessing wrong and flashing the opposite state after hydration.
 */
const PENDING = Symbol.for('mock-session-pending')

/** The cookie only changes across a navigation, which remounts this anyway. */
function subscribe(): () => void {
  return () => {}
}

function readIdentityKey(): string | null {
  return readCookie(MOCK_SESSION_COOKIE)
}

function useMockUser(): { user: SessionUser | null; isPending: boolean } {
  const key = useSyncExternalStore<string | null | typeof PENDING>(
    subscribe,
    readIdentityKey,
    () => PENDING,
  )

  if (key === PENDING) return { user: null, isPending: true }

  const identity = key && key in MOCK_IDENTITIES ? MOCK_IDENTITIES[key as MockIdentityKey] : null
  return { user: identity ? { ...identity, image: null } : null, isPending: false }
}

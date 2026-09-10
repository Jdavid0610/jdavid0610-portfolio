/**
 * Client-safe view of mock mode.
 *
 * Lives in `shared/` because the proxy and browser components need it too.
 * `NEXT_PUBLIC_MOCK_MODE` is inlined at build time, so this is a constant
 * comparison — dead code on the real path.
 */
export const MOCK_SESSION_COOKIE = 'mock-session'

export function isMockModeEnabled(): boolean {
  return process.env.NEXT_PUBLIC_MOCK_MODE === 'on'
}

/** Identities the mock backend recognises. Any password is accepted. */
export const MOCK_IDENTITIES = {
  admin: { id: 'mock-user-admin', name: 'Ada Admin', email: 'admin@example.com', role: 'admin' },
  user: { id: 'mock-user-basic', name: 'Uma User', email: 'user@example.com', role: 'user' },
} as const

export type MockIdentityKey = keyof typeof MOCK_IDENTITIES

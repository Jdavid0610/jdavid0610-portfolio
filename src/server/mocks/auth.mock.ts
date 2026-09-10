import 'server-only'

import { cookies } from 'next/headers'
import { AppError } from '@/server/errors'
import { MOCK_IDENTITIES, MOCK_SESSION_COOKIE, type MockIdentityKey } from '@/shared/lib/mock-mode'
import type { Session, SessionUser } from '@/server/auth/session'
import { mockOperation } from './config'

/**
 * A fake session backed by one cookie.
 *
 * Sign-in and sign-out really do toggle it, so the redirect rules, the proxy's
 * optimistic check and the RBAC branches all behave exactly as they do against
 * the real provider. The cookie holds only an identity *key* — it grants
 * nothing outside mock mode, where the branch is compiled out.
 */
function identityFor(key: string | undefined): (typeof MOCK_IDENTITIES)[MockIdentityKey] | null {
  if (key && key in MOCK_IDENTITIES) return MOCK_IDENTITIES[key as MockIdentityKey]
  return null
}

/** Anyone whose email contains "admin" signs in as the admin fixture. */
function identityKeyForEmail(email: string): MockIdentityKey {
  return email.toLowerCase().includes('admin') ? 'admin' : 'user'
}

export function toSessionUser(identity: (typeof MOCK_IDENTITIES)[MockIdentityKey]): SessionUser {
  return {
    id: identity.id,
    name: identity.name,
    email: identity.email,
    image: null,
    role: identity.role,
  }
}

export async function getMockSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const identity = identityFor(cookieStore.get(MOCK_SESSION_COOKIE)?.value)
  if (!identity) return null

  return {
    user: toSessionUser(identity),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
  }
}

export async function mockSignIn(email: string): Promise<void> {
  await mockOperation('auth.signIn', async () => {
    const cookieStore = await cookies()
    cookieStore.set(MOCK_SESSION_COOKIE, identityKeyForEmail(email), {
      path: '/',
      // Readable by the browser on purpose: on statically rendered pages the
      // client decides which header buttons to draw. It names a fixture, it
      // does not authorize anything, and the branch is dead outside mock mode.
      httpOnly: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
    })
  })
}

export async function mockSignOut(): Promise<void> {
  await mockOperation('auth.signOut', async () => {
    const cookieStore = await cookies()
    cookieStore.delete(MOCK_SESSION_COOKIE)
  })
}

export async function mockListUsers(): Promise<SessionUser[]> {
  return mockOperation('auth.listUsers', () => Object.values(MOCK_IDENTITIES).map(toSessionUser))
}

export async function mockUpdateProfile(userId: string, name: string): Promise<SessionUser> {
  return mockOperation('auth.updateProfile', () => {
    const identity = Object.values(MOCK_IDENTITIES).find((entry) => entry.id === userId)
    if (!identity) throw new AppError('error.unknownMockUser', 'not_found', 404)
    // Fixtures are frozen constants; return the edit without mutating them, so
    // a page reload shows the original and the demo stays reproducible.
    return { ...toSessionUser(identity), name }
  })
}

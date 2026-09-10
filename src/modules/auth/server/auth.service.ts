import 'server-only'

import { APIError } from 'better-auth/api'
import { headers } from 'next/headers'
import { eq } from 'drizzle-orm'
import { auth } from '@/server/auth/config'
import { db } from '@/server/db'
import { user } from '@/server/db/schema'
import { AppError, NotFoundError } from '@/server/errors'
import { isMockMode } from '@/server/mocks/config'
import * as mockAuth from '@/server/mocks/auth.mock'
import type { SignInInput, SignUpInput, UpdateProfileInput } from '../domain/schemas'
import type { SessionUser } from '../domain/types'

/**
 * Thin domain layer over Better Auth.
 *
 * It exists so actions, route handlers and tests all share one place where
 * provider errors become our error taxonomy — no `APIError` ever escapes.
 */
function rethrow(error: unknown, fallbackKey: string): never {
  if (error instanceof APIError) {
    // Better Auth's own message is English prose from a library we do not
    // translate, so our key wins. The provider's code is kept for logging.
    throw new AppError(fallbackKey, error.body?.code ?? 'auth_error', 400)
  }
  throw error
}

export async function signUp(input: SignUpInput): Promise<void> {
  if (isMockMode()) return mockAuth.mockSignIn(input.email)

  try {
    await auth.api.signUpEmail({
      body: { name: input.name, email: input.email, password: input.password },
      headers: await headers(),
    })
  } catch (error) {
    rethrow(error, 'error.signUpFailed')
  }
}

export async function signIn(input: SignInInput): Promise<void> {
  // Mock mode accepts any password; the email decides which fixture you become.
  if (isMockMode()) return mockAuth.mockSignIn(input.email)

  try {
    await auth.api.signInEmail({
      body: { email: input.email, password: input.password },
      headers: await headers(),
    })
  } catch (error) {
    rethrow(error, 'error.signInFailed')
  }
}

export async function signOut(): Promise<void> {
  if (isMockMode()) return mockAuth.mockSignOut()

  try {
    await auth.api.signOut({ headers: await headers() })
  } catch (error) {
    rethrow(error, 'error.signOutFailed')
  }
}

export async function updateProfile(userId: string, input: UpdateProfileInput): Promise<SessionUser> {
  if (isMockMode()) return mockAuth.mockUpdateProfile(userId, input.name)

  const [updated] = await db
    .update(user)
    .set({ name: input.name })
    .where(eq(user.id, userId))
    .returning()

  if (!updated) throw new NotFoundError('error.accountNotFound')

  return {
    id: updated.id,
    name: updated.name,
    email: updated.email,
    image: updated.image,
    role: updated.role,
  }
}

/** Admin-only listing. Returns a DTO — password hashes live in `account`, never here. */
export async function listUsers(limit = 50): Promise<SessionUser[]> {
  if (isMockMode()) return mockAuth.mockListUsers()

  const rows = await db.query.user.findMany({
    limit,
    orderBy: (u, { desc }) => [desc(u.createdAt)],
  })

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    image: row.image,
    role: row.role,
  }))
}

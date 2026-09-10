import 'server-only'

import { cache } from 'react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from './config'
import { ForbiddenError } from '@/server/errors'
import { isMockMode } from '@/server/mocks/config'
import { getMockSession } from '@/server/mocks/auth.mock'
import { defaultLocale, isLocale, type Locale } from '@/shared/i18n/config'

export type Role = 'user' | 'admin'

/** DTO: the only user shape allowed to cross into client components. */
export type SessionUser = {
  id: string
  name: string
  email: string
  image: string | null
  role: Role
}

export type Session = { user: SessionUser; expiresAt: Date }

/**
 * The Data Access Layer entry point.
 *
 * `cache()` memoizes it for the lifetime of one request, so a layout, a page
 * and three server components can each call it and still hit the session
 * store once. This — not `proxy.ts` — is the real authentication boundary.
 */
export const getSession = cache(async (): Promise<Session | null> => {
  // The one place the rest of the app never has to think about mock mode.
  if (isMockMode()) return getMockSession()

  const result = await auth.api.getSession({ headers: await headers() })
  if (!result) return null
  return {
    user: {
      id: result.user.id,
      name: result.user.name,
      email: result.user.email,
      image: result.user.image ?? null,
      role: (result.user.role as Role) ?? 'user',
    },
    expiresAt: result.session.expiresAt,
  }
})

/** Locale + path of the current request, published by `proxy.ts`. */
async function requestContext(): Promise<{ locale: Locale; pathname: string }> {
  const h = await headers()
  const locale = h.get('x-locale')
  const pathname = h.get('x-pathname') ?? '/'
  return { locale: isLocale(locale) ? locale : defaultLocale, pathname }
}

/**
 * Use at the top of every protected layout, page, action and route handler.
 * Redirects rather than throwing so the caller reads as a straight line.
 */
export async function requireSession(): Promise<Session> {
  const session = await getSession()
  if (session) return session

  const { locale, pathname } = await requestContext()
  const callback = encodeURIComponent(pathname)
  redirect(`/${locale}/sign-in?callbackUrl=${callback}`)
}

/** Authorization check. Throws — a signed-in user hitting a forbidden page is a bug, not a flow. */
export async function requireRole(role: Role): Promise<Session> {
  const session = await requireSession()
  if (session.user.role !== role) {
    throw new ForbiddenError('error.roleRequired')
  }
  return session
}

export async function getCurrentLocale(): Promise<Locale> {
  return (await requestContext()).locale
}

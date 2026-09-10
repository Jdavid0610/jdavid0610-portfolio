import { NextResponse, type NextRequest } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'
import { defaultLocale, isLocale, locales, matchLocale, type Locale } from '@/shared/i18n/config'
import { authOnlySegments, protectedSegments, routes } from '@/shared/lib/routes'
import { isMockModeEnabled, MOCK_SESSION_COOKIE } from '@/shared/lib/mock-mode'

/**
 * Next 16 renamed `middleware` to `proxy`. It runs on the Node runtime for
 * every matched request, including prefetches.
 *
 * Its job is strictly:
 *   1. put a locale on every URL, and
 *   2. make *optimistic* auth redirects so signed-out users never see a
 *      protected page flash.
 *
 * It deliberately does not query the database and is NOT a security boundary
 * — a cookie only proves a cookie exists. The real check is `requireSession()`
 * in the protected layout and in every action.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  // --- 1. Locale ----------------------------------------------------------
  const segments = pathname.split('/')
  const maybeLocale = segments[1]

  if (!isLocale(maybeLocale)) {
    const locale = resolveLocale(request)
    const url = request.nextUrl.clone()
    url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
    return NextResponse.redirect(url)
  }

  const locale: Locale = maybeLocale
  const pathWithoutLocale = `/${segments.slice(2).join('/')}`
  const topSegment = segments[2] ?? ''

  // --- 2. Optimistic auth -------------------------------------------------
  const hasSessionCookie = isMockModeEnabled()
    ? Boolean(request.cookies.get(MOCK_SESSION_COOKIE))
    : Boolean(getSessionCookie(request))
  const isProtected = (protectedSegments as readonly string[]).includes(topSegment)
  const isAuthOnly = (authOnlySegments as readonly string[]).includes(topSegment)

  if (isProtected && !hasSessionCookie) {
    const url = request.nextUrl.clone()
    url.pathname = `/${locale}/sign-in`
    url.search = ''
    url.searchParams.set('callbackUrl', `${pathname}${search}`)
    return NextResponse.redirect(url)
  }

  if (isAuthOnly && hasSessionCookie) {
    return NextResponse.redirect(new URL(routes.dashboard(locale), request.url))
  }

  // --- 3. Publish request context ----------------------------------------
  // Server components cannot read the current pathname; these headers are how
  // the session DAL builds a locale-aware redirect with a callback URL.
  const headers = new Headers(request.headers)
  headers.set('x-locale', locale)
  headers.set('x-pathname', `${pathname}${search}`)
  headers.set('x-path-without-locale', pathWithoutLocale)

  return NextResponse.next({ request: { headers } })
}

function resolveLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get('locale')?.value
  if (isLocale(cookieLocale)) return cookieLocale
  return matchLocale(request.headers.get('accept-language')) ?? defaultLocale
}

export const config = {
  /**
   * Everything except API routes, Next internals and files with an extension.
   * Auth endpoints must not be locale-prefixed, hence the `api` exclusion.
   */
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
}

export const supportedLocales = locales

import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, isLocale, locales, matchLocale, type Locale } from '@/shared/i18n/config'

/**
 * Next 16 renamed `middleware` to `proxy`. It runs on the Node runtime for
 * every matched request, including prefetches.
 *
 * Its only job on this site is to put a locale on every URL: the site is a
 * fully prerendered static portfolio with no session and nothing to protect.
 * Machine-readable routes (`/robots.txt`, `/sitemap.xml`, `/llms.txt`,
 * `/llms-full.txt`, `/manifest.webmanifest`) must never be locale-prefixed,
 * which the matcher below guarantees by excluding anything with an extension.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const segments = pathname.split('/')
  const maybeLocale = segments[1]

  if (!isLocale(maybeLocale)) {
    const locale = resolveLocale(request)
    const url = request.nextUrl.clone()
    url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
    return NextResponse.redirect(url)
  }

  const locale: Locale = maybeLocale

  // Server components cannot read the current pathname; publishing it as a
  // header keeps that option open without any route reading it today.
  const headers = new Headers(request.headers)
  headers.set('x-locale', locale)

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
   * The extension exclusion is what keeps `/llms.txt`, `/robots.txt` and
   * `/sitemap.xml` outside `[locale]`.
   */
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
}

export const supportedLocales = locales

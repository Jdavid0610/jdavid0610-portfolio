import { notFound } from 'next/navigation'
import { requireSession } from '@/server/auth/session'
import { isLocale } from '@/shared/i18n/config'
import { AppNav } from '@/shared/layout/app-nav'
import { SiteHeader } from '@/shared/layout/site-header'
import { UserMenu } from '@/modules/auth/ui/user-menu'

/**
 * THE authentication boundary for the whole authenticated area.
 *
 * `requireSession()` hits the session store (memoized per request), so it is a
 * real check, unlike the cookie sniff in `proxy.ts`. Individual actions still
 * re-check, because a layout does not protect a Server Action.
 */
export default async function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const session = await requireSession()

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader locale={locale} auth={<UserMenu user={session.user} />} />
      <div className="mx-auto w-full max-w-5xl px-4">
        <AppNav isAdmin={session.user.role === 'admin'} />
      </div>
      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        {children}
      </main>
    </div>
  )
}

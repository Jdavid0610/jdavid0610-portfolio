import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isLocale } from '@/shared/i18n/config'
import { siteConfig } from '@/shared/config/site'
import { routes } from '@/shared/lib/routes'
import { LocaleSwitcher } from '@/shared/layout/locale-switcher'

/**
 * Auth shell. Deliberately minimal: no session read, no navigation — the only
 * job of these pages is to get one form submitted.
 */
export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="flex items-center justify-between px-4 py-6">
        <Link href={routes.home(locale)} className="font-semibold">
          {siteConfig.name}
        </Link>
        <LocaleSwitcher current={locale} />
      </header>
      <main id="main" className="flex flex-1 items-center justify-center px-4 pb-16">
        <div className="w-full max-w-sm">{children}</div>
      </main>
    </div>
  )
}

import { notFound } from 'next/navigation'
import { isLocale } from '@/shared/i18n/config'
import { JsonLd, organizationJsonLd, websiteJsonLd } from '@/shared/lib/json-ld'
import { SiteFooter } from '@/shared/layout/site-footer'
import { SiteHeader } from '@/shared/layout/site-header'
import { AuthActions } from '@/modules/auth/ui/auth-actions'

/**
 * Public shell — deliberately free of `headers()`, `cookies()` and any session
 * read, because a single one of those would turn every marketing route
 * dynamic. The auth corner resolves on the client instead, so these pages stay
 * prerendered and cacheable at the edge.
 */
export default async function MarketingLayout({
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
      <SiteHeader locale={locale} auth={<AuthActions />} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter locale={locale} />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd(locale)} />
    </div>
  )
}

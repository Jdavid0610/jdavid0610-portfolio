import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { buildMetadata } from '@/shared/lib/seo'
import { getPageMeta } from '@/modules/pages/content'
import { routes } from '@/shared/lib/routes'
import { breadcrumbs } from '@/shared/lib/breadcrumbs'
import { breadcrumbJsonLd, faqPageJsonLd, graph, JsonLd } from '@/shared/lib/json-ld'
import { BreadcrumbTrail } from '@/shared/ui/breadcrumb-trail'
import { getFaq, getFaqIntro } from '@/modules/faq/content'
import { FaqList } from '@/modules/faq/ui/faq-list'



export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const meta = getPageMeta(locale, 'faq')
  return buildMetadata({
    locale,
    path: '/faq',
    title: meta.title,
    description: meta.description,
  })
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const t = getDictionary(locale)
  const entries = getFaq(locale)
  const trail = breadcrumbs(locale, t, [{ name: t.nav.faq, path: routes.faq(locale) }])

  return (
    <div className="py-10">
      <BreadcrumbTrail items={trail} label={t.nav.footerLabel} />

      <header className="mt-6">
        <h1 className="text-3xl font-semibold sm:text-4xl">{t.faq.title}</h1>
        <p className="mt-4 max-w-measure text-pretty text-muted">{getFaqIntro(locale)}</p>
      </header>

      <div className="mt-12">
        <FaqList entries={entries} />
      </div>

      <p className="mt-12 text-sm text-muted">
        {t.faq.contactPrompt}{' '}
        <Link
          href={routes.contact(locale)}
          className="text-brand underline decoration-border underline-offset-4"
        >
          {t.faq.contactLink}
        </Link>
      </p>

      {/*
        Emitted exactly once on the site, from the same strings the page
        renders. Two `FAQPage` blocks on one site is a duplication signal, and
        structured data that contradicts the visible copy is a policy violation.
      */}
      <JsonLd
        data={graph(
          faqPageJsonLd({ locale, entries }),
          breadcrumbJsonLd(trail, { locale, path: '/faq' }),
        )}
      />
    </div>
  )
}

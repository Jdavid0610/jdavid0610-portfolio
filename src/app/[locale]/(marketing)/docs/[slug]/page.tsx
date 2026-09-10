import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isLocale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { siteConfig } from '@/shared/config/site'
import { breadcrumbJsonLd, JsonLd } from '@/shared/lib/json-ld'
import { buildMetadata } from '@/shared/lib/seo'
import { routes } from '@/shared/lib/routes'
import { docSlugs, getDocPage, getDocs } from '@/modules/docs/content'
import { DocBlocks } from '@/modules/docs/ui/doc-blocks'

type Props = { params: Promise<{ locale: string; slug: string }> }

/** Every page exists in every locale, so the whole section is prerendered. */
export function generateStaticParams(): Array<{ slug: string }> {
  return docSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}

  const page = getDocPage(locale, slug)
  if (!page) return buildMetadata({ locale, path: `/docs/${slug}`, noIndex: true })

  return buildMetadata({
    locale,
    path: `/docs/${page.slug}`,
    title: page.title,
    description: page.summary,
    type: 'article',
  })
}

export default async function DocPage({ params }: Props) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const page = getDocPage(locale, slug)
  if (!page) notFound()

  const docs = getDocs(locale)
  const t = getDictionary(locale)
  const index = docs.pages.findIndex((entry) => entry.slug === page.slug)
  const previous = docs.pages[index - 1]
  const next = docs.pages[index + 1]

  return (
    <article className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-balance">{page.title}</h1>
        <p className="text-lg text-muted text-pretty">{page.summary}</p>
      </header>

      <DocBlocks blocks={page.blocks} />

      <nav className="mt-6 flex justify-between gap-4 border-t border-border pt-6 text-sm">
        {previous ? (
          <Link href={routes.docPage(locale, previous.slug)} className="text-brand hover:underline">
            ← {t.docs.previous}: {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={routes.docPage(locale, next.slug)}
            className="text-right text-brand hover:underline"
          >
            {t.docs.next}: {next.title} →
          </Link>
        ) : null}
      </nav>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.nav.home, url: `${siteConfig.url}${routes.home(locale)}` },
          { name: docs.title, url: `${siteConfig.url}${routes.docs(locale)}` },
          { name: page.title, url: `${siteConfig.url}${routes.docPage(locale, page.slug)}` },
        ])}
      />
    </article>
  )
}

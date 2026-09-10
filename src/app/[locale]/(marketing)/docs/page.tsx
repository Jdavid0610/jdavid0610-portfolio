import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isLocale } from '@/shared/i18n/config'
import { buildMetadata } from '@/shared/lib/seo'
import { routes } from '@/shared/lib/routes'
import { getDocs } from '@/modules/docs/content'

/** Static: the content is compiled in, so there is nothing to revalidate for. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const docs = getDocs(locale)
  return buildMetadata({ locale, path: '/docs', title: docs.title, description: docs.intro })
}

export default async function DocsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const docs = getDocs(locale)

  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight">{docs.title}</h1>
        <p className="text-lg text-muted text-pretty">{docs.intro}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {docs.pages.map((page) => (
          <Link
            key={page.slug}
            href={routes.docPage(locale, page.slug)}
            className="rounded-card border border-border bg-surface p-5 transition hover:border-brand"
          >
            <h2 className="font-medium">{page.title}</h2>
            <p className="mt-1 text-sm text-muted">{page.summary}</p>
          </Link>
        ))}
      </div>
    </article>
  )
}

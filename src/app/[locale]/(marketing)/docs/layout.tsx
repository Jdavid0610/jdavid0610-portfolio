import { notFound } from 'next/navigation'
import { isLocale } from '@/shared/i18n/config'
import { getDocs } from '@/modules/docs/content'
import { DocsNav } from '@/modules/docs/ui/docs-nav'

/**
 * Two columns on a wide screen, stacked on a narrow one. The nav is shared, so
 * it lives in the layout and is not re-rendered on navigation between pages.
 */
export default async function DocsLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const docs = getDocs(locale)

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 md:grid-cols-[13rem_1fr]">
      <aside className="md:sticky md:top-24 md:self-start">
        <p className="mb-2 px-3 text-xs font-medium tracking-wide text-muted uppercase">
          {docs.title}
        </p>
        <DocsNav pages={docs.pages.map(({ slug, title }) => ({ slug, title }))} />
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { siteConfig } from '@/shared/config/site'
import { buildMetadata } from '@/shared/lib/seo'
import { getPageMeta } from '@/modules/pages/content'
import { routes } from '@/shared/lib/routes'
import { breadcrumbs } from '@/shared/lib/breadcrumbs'
import {
  breadcrumbJsonLd,
  collectionPageJsonLd,
  graph,
  ids,
  itemListJsonLd,
  JsonLd,
} from '@/shared/lib/json-ld'
import { BreadcrumbTrail } from '@/shared/ui/breadcrumb-trail'
import { getOpenSourceCopy, getTemplates } from '@/modules/open-source/content'
import { TemplateCard } from '@/modules/open-source/ui/template-card'



export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const meta = getPageMeta(locale, 'openSource')
  return buildMetadata({
    locale,
    path: '/open-source',
    title: meta.title,
    description: meta.description,
  })
}

export default async function OpenSourcePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const meta = getPageMeta(locale, 'openSource')
  const t = getDictionary(locale)
  const copy = getOpenSourceCopy(locale)
  const templates = getTemplates(locale)
  const trail = breadcrumbs(locale, t, [
    { name: t.nav.openSource, path: routes.openSource(locale) },
  ])

  return (
    <div className="py-10">
      <BreadcrumbTrail items={trail} label={t.nav.footerLabel} />

      <header className="mt-6">
        <h1 className="text-3xl font-semibold sm:text-4xl">{copy.indexTitle}</h1>
        <p className="mt-4 max-w-measure text-pretty text-muted">{copy.indexIntro}</p>
        <p className="mt-6 max-w-measure border-l-2 border-brand pl-4 text-pretty font-medium">
          {copy.dogfoodLine}
        </p>
      </header>

      <div className="mt-12 flex flex-col gap-8">
        {templates.map((template) => (
          <TemplateCard
            key={template.slug}
            template={template}
            copy={copy}
            locale={locale}
            level={2}
          />
        ))}
      </div>

      <JsonLd
        data={graph(
          collectionPageJsonLd({
            locale,
            path: '/open-source',
            name: meta.title,
            description: meta.description,
          }),
          itemListJsonLd({
            locale,
            path: '/open-source',
            name: meta.title,
            items: templates.map((template) => ({
              name: template.name,
              url: `${siteConfig.url}${routes.template(locale, template.slug)}`,
              id: ids.template(locale, template.slug),
            })),
          }),
          breadcrumbJsonLd(trail, { locale, path: '/open-source' }),
        )}
      />
    </div>
  )
}

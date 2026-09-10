import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { buildMetadata } from '@/shared/lib/seo'
import { routes } from '@/shared/lib/routes'
import { breadcrumbs } from '@/shared/lib/breadcrumbs'
import { formatIsoDate } from '@/shared/lib/format'
import {
  breadcrumbJsonLd,
  graph,
  JsonLd,
  softwareSourceCodeJsonLd,
} from '@/shared/lib/json-ld'
import { Alert } from '@/shared/ui/alert'
import { BreadcrumbTrail } from '@/shared/ui/breadcrumb-trail'
import { DefinitionList } from '@/shared/ui/definition-list'
import { Prose } from '@/shared/ui/prose'
import { Section } from '@/shared/ui/section'
import { TagList } from '@/shared/ui/tag'
import { getOpenSourceCopy, getTemplate, templateSlugs } from '@/modules/open-source/content'
import { getProject } from '@/modules/projects/content'

type Props = { params: Promise<{ locale: string; slug: string }> }

/**
 * Fully prerendered. Repository figures are typed data labelled with the date
 * they were read, rather than a live fetch, so no page here needs runtime data
 * access and no unlabelled number can look current when it is not.
 */
export function generateStaticParams(): Array<{ slug: string }> {
  return templateSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}

  const template = getTemplate(locale, slug)
  if (!template) return buildMetadata({ locale, path: `/open-source/${slug}`, noIndex: true })

  return buildMetadata({
    locale,
    path: `/open-source/${template.slug}`,
    title: template.metaTitle,
    description: template.metaDescription,
  })
}

export default async function TemplatePage({ params }: Props) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const template = getTemplate(locale, slug)
  if (!template) notFound()

  const t = getDictionary(locale)
  const copy = getOpenSourceCopy(locale)
  const path = `/open-source/${template.slug}`
  const trail = breadcrumbs(locale, t, [
    { name: t.nav.openSource, path: routes.openSource(locale) },
    { name: template.name, path: routes.template(locale, template.slug) },
  ])

  const project = template.relatedProjectSlug
    ? getProject(locale, template.relatedProjectSlug)
    : null

  const facts = [
    {
      label: copy.labels.repository,
      value: (
        <a
          href={template.repository}
          rel="noopener"
          className="break-words text-brand underline decoration-border underline-offset-4"
        >
          {template.repository.replace('https://github.com/', '')}
        </a>
      ),
    },
    ...(template.homepage
      ? [
          {
            label: copy.labels.demo,
            value: (
              <a
                href={template.homepage}
                rel="noopener"
                className="break-words text-brand underline decoration-border underline-offset-4"
              >
                {template.homepage.replace(/^https?:\/\//, '')}
              </a>
            ),
          },
        ]
      : []),
    { label: copy.labels.language, value: template.programmingLanguage },
    { label: copy.labels.stars, value: `${template.stars}` },
    {
      label: copy.labels.created,
      value: <time dateTime={template.created}>{formatIsoDate(template.created, locale)}</time>,
    },
    {
      label: copy.labels.lastPush,
      value: <time dateTime={template.lastPush}>{formatIsoDate(template.lastPush, locale)}</time>,
    },
    { label: copy.labels.license, value: template.license ?? copy.labels.noLicense },
    {
      label: copy.labels.asOf,
      value: <time dateTime={template.asOf}>{formatIsoDate(template.asOf, locale)}</time>,
    },
    ...(project
      ? [
          {
            label: copy.labels.relatedProject,
            value: (
              <Link
                href={routes.project(locale, project.slug)}
                className="text-brand underline decoration-border underline-offset-4"
              >
                {project.name}
              </Link>
            ),
          },
        ]
      : []),
  ]

  return (
    <article className="py-10">
      <BreadcrumbTrail items={trail} label={t.nav.footerLabel} />

      <header className="mt-6">
        {template.poweringThisSite ? (
          <p className="font-mono text-xs tracking-wide uppercase text-brand">
            {copy.labels.poweringThisSite}
          </p>
        ) : null}
        <h1 className="mt-3 font-mono text-2xl font-semibold sm:text-3xl">{template.name}</h1>
        <p className="mt-4 max-w-measure text-pretty text-lg text-muted">{template.definition}</p>
      </header>

      {template.poweringThisSite ? (
        <p className="mt-8 max-w-measure border-l-2 border-brand pl-4 text-pretty font-medium">
          {copy.dogfoodLine}
        </p>
      ) : null}

      <div className="mt-10">
        <DefinitionList items={facts} />
      </div>

      <div className="mt-16 flex flex-col gap-16">
        <Section id="overview" title={t.common.overview}>
          <Prose paragraphs={[template.problem, ...template.narrative]} />
        </Section>

        <Section id="includes" title={copy.labels.includes}>
          <ul className="flex max-w-measure flex-col gap-2 pl-5">
            {template.includes.map((item) => (
              <li key={item.slice(0, 40)} className="list-disc text-pretty text-muted">
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="stack" title={copy.labels.tags}>
          <TagList items={template.tags} label={copy.labels.tags} />
        </Section>

        <Section id="maintenance" title={copy.labels.maintenance}>
          <p className="max-w-measure text-pretty text-muted">{template.maintenance}</p>
        </Section>

        {template.note ? (
          <Alert tone="info" className="max-w-measure">
            {template.note}
          </Alert>
        ) : null}
      </div>

      <JsonLd
        data={graph(
          softwareSourceCodeJsonLd({
            locale,
            slug: template.slug,
            name: template.name,
            repository: template.repository,
            description: template.description,
            programmingLanguage: template.programmingLanguage,
            runtimePlatform: template.runtimePlatform,
            keywords: template.tags,
            dateCreated: template.created,
            dateModified: template.lastPush,
          }),
          breadcrumbJsonLd(trail, { locale, path }),
        )}
      />
    </article>
  )
}

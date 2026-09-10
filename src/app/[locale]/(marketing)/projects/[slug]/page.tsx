import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { Thing } from 'schema-dts'
import { isLocale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { siteConfig } from '@/shared/config/site'
import { buildMetadata } from '@/shared/lib/seo'
import { routes } from '@/shared/lib/routes'
import { breadcrumbs } from '@/shared/lib/breadcrumbs'
import {
  applicationJsonLd,
  breadcrumbJsonLd,
  graph,
  JsonLd,
  organizationJsonLd,
} from '@/shared/lib/json-ld'
import { Alert } from '@/shared/ui/alert'
import { BreadcrumbTrail } from '@/shared/ui/breadcrumb-trail'
import { DefinitionList } from '@/shared/ui/definition-list'
import { Prose } from '@/shared/ui/prose'
import { Section } from '@/shared/ui/section'
import { TagList } from '@/shared/ui/tag'
import { getProject, getProjectsCopy, projectSlugs } from '@/modules/projects/content'
import { getRole } from '@/modules/experience/content'
import { getTemplate } from '@/modules/open-source/content'

type Props = { params: Promise<{ locale: string; slug: string }> }

/** Every project exists in every locale, so the whole section is prerendered. */
export function generateStaticParams(): Array<{ slug: string }> {
  return projectSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}

  const project = getProject(locale, slug)
  if (!project) return buildMetadata({ locale, path: `/projects/${slug}`, noIndex: true })

  return buildMetadata({
    locale,
    path: `/projects/${project.slug}`,
    title: project.metaTitle,
    description: project.metaDescription,
  })
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const project = getProject(locale, slug)
  if (!project) notFound()

  const t = getDictionary(locale)
  const copy = getProjectsCopy(locale)
  const path = `/projects/${project.slug}`
  const trail = breadcrumbs(locale, t, [
    { name: t.nav.projects, path: routes.projects(locale) },
    { name: project.name, path: routes.project(locale, project.slug) },
  ])

  const role = project.experienceSlug ? getRole(locale, project.experienceSlug) : null
  const template = project.relatedTemplateSlug
    ? getTemplate(locale, project.relatedTemplateSlug)
    : null

  const facts = [
    { label: copy.sectionLabels.role, value: project.role },
    ...project.links.map((link) => ({
      label: copy.linkLabels[link.key],
      value: (
        <a
          href={link.href}
          rel="noopener"
          className="break-words text-brand underline decoration-border underline-offset-4"
        >
          {link.display}
        </a>
      ),
    })),
    ...(project.facts ?? []).map((fact) => ({ label: fact.label, value: fact.value })),
  ]

  const entities: Thing[] = [
    applicationJsonLd({
      locale,
      slug: project.slug,
      type: project.schemaType,
      name: project.name,
      url: project.links[0]?.href ?? `${siteConfig.url}${path}`,
      description: project.description,
      applicationCategory: project.applicationCategory,
      applicationSubCategory: project.applicationSubCategory,
      operatingSystem: project.operatingSystem,
      inLanguage: project.inLanguage,
      featureList: project.features,
      aggregateRating: project.aggregateRating
        ? {
            ratingValue: project.aggregateRating.ratingValue,
            ratingCount: project.aggregateRating.ratingCount,
            bestRating: project.aggregateRating.bestRating,
            worstRating: project.aggregateRating.worstRating,
          }
        : undefined,
      publisherOrganizationKey: project.relatedOrganization?.key ?? project.organization?.key,
      publisherName: project.slug === 'herbafit' ? 'BTi Group' : undefined,
      installUrl: project.links.find((link) => link.key === 'store')?.href,
    }),
    breadcrumbJsonLd(trail, { locale, path }),
  ]

  if (project.organization && project.organizationDescription) {
    entities.push(
      organizationJsonLd({
        ...project.organization,
        description: project.organizationDescription,
      }),
    )
  }
  if (project.relatedOrganization && project.relatedOrganizationDescription) {
    entities.push(
      organizationJsonLd({
        ...project.relatedOrganization,
        description: project.relatedOrganizationDescription,
      }),
    )
  }

  return (
    <article className="py-10">
      <BreadcrumbTrail items={trail} label={t.nav.footerLabel} />

      <header className="mt-6">
        <p className="font-mono text-xs tracking-wide uppercase text-faint">
          {copy.bucketLabels[project.bucket]}
          <span aria-hidden> · </span>
          {copy.statusLabels[project.status]}
        </p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{project.name}</h1>
        <p className="mt-4 max-w-measure text-pretty text-lg text-muted">{project.definition}</p>
      </header>

      <div className="mt-10">
        <DefinitionList items={facts} />
      </div>

      <div className="mt-16 flex flex-col gap-16">
        <Section id="overview" title={t.common.overview}>
          <Prose paragraphs={project.narrative} />
        </Section>

        <Section id="problem" title={copy.sectionLabels.problem}>
          <p className="max-w-measure text-pretty text-muted">{project.problem}</p>
        </Section>

        <Section id="contribution" title={copy.sectionLabels.contribution}>
          <p className="max-w-measure text-pretty text-muted">{project.contribution}</p>
          {role ? (
            <p className="mt-4 text-sm">
              <Link
                href={`${routes.experience(locale)}#${role.slug}`}
                className="text-brand underline decoration-border underline-offset-4"
              >
                {copy.sectionLabels.relatedRole}: {role.title}, {role.employer}
              </Link>
            </p>
          ) : null}
          {template ? (
            <p className="mt-2 text-sm">
              <Link
                href={routes.template(locale, template.slug)}
                className="font-mono text-brand underline decoration-border underline-offset-4"
              >
                {template.name}
              </Link>
            </p>
          ) : null}
        </Section>

        <Section id="features" title={copy.sectionLabels.features}>
          <ul className="flex max-w-measure flex-col gap-2 pl-5">
            {project.features.map((feature) => (
              <li key={feature.slice(0, 40)} className="list-disc text-pretty text-muted">
                {feature}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="stack" title={copy.sectionLabels.stack}>
          <TagList items={project.stack} label={copy.sectionLabels.stack} />
        </Section>

        {project.note ? (
          <Alert tone="info" className="max-w-measure">
            {project.note}
          </Alert>
        ) : null}
      </div>

      <JsonLd data={graph(...entities)} />
    </article>
  )
}

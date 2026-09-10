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
import { getProjects, getProjectsCopy } from '@/modules/projects/content'
import { ProjectCard } from '@/modules/projects/ui/project-card'



export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const meta = getPageMeta(locale, 'projects')
  return buildMetadata({
    locale,
    path: '/projects',
    title: meta.title,
    description: meta.description,
  })
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const meta = getPageMeta(locale, 'projects')
  const t = getDictionary(locale)
  const copy = getProjectsCopy(locale)
  const projects = getProjects(locale)
  const trail = breadcrumbs(locale, t, [{ name: t.nav.projects, path: routes.projects(locale) }])

  return (
    <div className="py-10">
      <BreadcrumbTrail items={trail} label={t.nav.footerLabel} />

      <header className="mt-6">
        <h1 className="text-3xl font-semibold sm:text-4xl">{meta.title}</h1>
        <p className="mt-4 max-w-measure text-pretty text-muted">{copy.indexIntro}</p>
      </header>

      <div className="mt-12 flex flex-col gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
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
            path: '/projects',
            name: meta.title,
            description: meta.description,
          }),
          itemListJsonLd({
            locale,
            path: '/projects',
            name: meta.title,
            // Derived from the same array the page renders, so the order and
            // the count can never disagree with the visible list.
            items: projects.map((project) => ({
              name: project.name,
              url: `${siteConfig.url}${routes.project(locale, project.slug)}`,
              id: ids.project(locale, project.slug),
            })),
          }),
          breadcrumbJsonLd(trail, { locale, path: '/projects' }),
        )}
      />
    </div>
  )
}

import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { siteConfig } from '@/shared/config/site'
import { buildMetadata } from '@/shared/lib/seo'
import { getPageMeta } from '@/modules/pages/content'
import { routes } from '@/shared/lib/routes'
import { breadcrumbs } from '@/shared/lib/breadcrumbs'
import { formatMonth } from '@/shared/lib/format'
import {
  breadcrumbJsonLd,
  graph,
  itemListJsonLd,
  JsonLd,
  profilePageJsonLd,
} from '@/shared/lib/json-ld'
import { Alert } from '@/shared/ui/alert'
import { BreadcrumbTrail } from '@/shared/ui/breadcrumb-trail'
import { Section } from '@/shared/ui/section'
import { TagList } from '@/shared/ui/tag'
import { getExperienceCopy, getRoles } from '@/modules/experience/content'
import { getProject } from '@/modules/projects/content'
import { education, getProfile } from '@/modules/profile/content'
import { ExperienceTimeline } from '@/modules/experience/ui/experience-timeline'



export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const meta = getPageMeta(locale, 'experience')
  return buildMetadata({
    locale,
    path: '/experience',
    title: meta.title,
    description: meta.description,
  })
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const meta = getPageMeta(locale, 'experience')
  const t = getDictionary(locale)
  const copy = getExperienceCopy(locale)
  const roles = getRoles(locale)
  const profile = getProfile(locale)
  const trail = breadcrumbs(locale, t, [
    { name: t.nav.experience, path: routes.experience(locale) },
  ])

  // `YYYY-MM` for the open end of the current role. Read once here so the
  // timeline component stays a pure function of its props.
  const today = new Date().toISOString().slice(0, 7)

  return (
    <div className="py-10">
      <BreadcrumbTrail items={trail} label={t.nav.footerLabel} />

      <header className="mt-6">
        <h1 className="text-3xl font-semibold sm:text-4xl">{t.experience.title}</h1>
        <p className="mt-4 max-w-measure text-pretty text-muted">{copy.overlapNote}</p>
      </header>

      <div className="mt-12 flex flex-col gap-16">
        <Section
          id="timeline"
          title={t.experience.timelineTitle}
          description={t.experience.timelineDescription}
        >
          <ExperienceTimeline roles={roles} copy={copy} locale={locale} today={today} />
        </Section>

        <Section id="roles" title={t.experience.rolesTitle}>
          <div className="flex flex-col gap-14">
            {roles.map((role) => {
              const projects = role.projectSlugs
                .map((slug) => getProject(locale, slug))
                .filter((project): project is NonNullable<typeof project> => Boolean(project))

              return (
                <article key={role.slug} id={role.slug} className="scroll-mt-24 rule-top pt-6">
                  <h3 className="text-lg font-semibold">
                    {role.title}
                    <span className="text-muted">, {role.employer}</span>
                  </h3>

                  <p className="mt-1 text-sm text-faint">
                    <time dateTime={role.start}>{formatMonth(role.start, locale)}</time>
                    <span aria-hidden> – </span>
                    {role.end ? (
                      <time dateTime={role.end}>{formatMonth(role.end, locale)}</time>
                    ) : (
                      copy.presentLabel
                    )}
                    <span aria-hidden> · </span>
                    {role.location}
                    <span aria-hidden> · </span>
                    {copy.bucketLabels[role.bucket]}
                  </p>

                  <p className="mt-4 max-w-measure text-pretty text-muted">{role.summary}</p>

                  <h4 className="mt-6 text-sm font-semibold tracking-wide uppercase text-faint">
                    {t.experience.achievementsTitle}
                  </h4>
                  <ul className="mt-2 flex max-w-measure flex-col gap-2 pl-5">
                    {role.achievements.map((achievement) => (
                      <li
                        key={achievement.slice(0, 40)}
                        className="list-disc text-pretty text-muted"
                      >
                        {achievement}
                      </li>
                    ))}
                  </ul>

                  {role.technologies.length > 0 ? (
                    <>
                      <h4 className="mt-6 text-sm font-semibold tracking-wide uppercase text-faint">
                        {t.experience.technologiesTitle}
                      </h4>
                      <TagList
                        items={role.technologies}
                        label={t.experience.technologiesTitle}
                        className="mt-2"
                      />
                    </>
                  ) : null}

                  {projects.length > 0 ? (
                    <>
                      <h4 className="mt-6 text-sm font-semibold tracking-wide uppercase text-faint">
                        {t.experience.projectsTitle}
                      </h4>
                      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                        {projects.map((project) => (
                          <li key={project.slug}>
                            <Link
                              href={routes.project(locale, project.slug)}
                              className="text-brand underline decoration-border underline-offset-4"
                            >
                              {project.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </article>
              )
            })}
          </div>
        </Section>

        <Section id="education" title={t.experience.educationTitle}>
          <p className="max-w-measure text-pretty text-muted">{profile.education.summary}</p>
          <p className="mt-3 text-sm text-faint">
            <time dateTime={education.start}>{formatMonth(education.start, locale)}</time>
            <span aria-hidden> – </span>
            <time dateTime={education.end}>{formatMonth(education.end, locale)}</time>
          </p>
        </Section>

        <Alert tone="info" className="max-w-measure">
          {copy.overlapNote}
        </Alert>
      </div>

      <JsonLd
        data={graph(
          profilePageJsonLd({
            locale,
            path: '/experience',
            name: meta.title,
            description: meta.description,
          }),
          itemListJsonLd({
            locale,
            path: '/experience',
            name: meta.title,
            items: roles.map((role) => ({
              name: `${role.title}, ${role.employer}`,
              url: `${siteConfig.url}${routes.experience(locale)}#${role.slug}`,
            })),
          }),
          breadcrumbJsonLd(trail, { locale, path: '/experience' }),
        )}
      />
    </div>
  )
}

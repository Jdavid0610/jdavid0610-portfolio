import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { buildMetadata } from '@/shared/lib/seo'
import { getPageMeta } from '@/modules/pages/content'
import { routes } from '@/shared/lib/routes'
import { breadcrumbs } from '@/shared/lib/breadcrumbs'
import { breadcrumbJsonLd, graph, JsonLd, profilePageJsonLd } from '@/shared/lib/json-ld'
import { BreadcrumbTrail } from '@/shared/ui/breadcrumb-trail'
import { Prose } from '@/shared/ui/prose'
import { Section } from '@/shared/ui/section'
import { getProfile, education } from '@/modules/profile/content'
import {
  AlsoListedSkills,
  SkillGroups,
  SkillTierLegend,
} from '@/modules/profile/ui/skill-groups'



export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const meta = getPageMeta(locale, 'about')
  return buildMetadata({
    locale,
    path: '/about',
    title: meta.title,
    description: meta.description,
  })
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const meta = getPageMeta(locale, 'about')
  const t = getDictionary(locale)
  const profile = getProfile(locale)
  const trail = breadcrumbs(locale, t, [{ name: t.nav.about, path: routes.about(locale) }])

  return (
    <article className="py-10">
      <BreadcrumbTrail items={trail} label={t.nav.footerLabel} />

      <header className="mt-6">
        <h1 className="text-3xl font-semibold sm:text-4xl">{meta.title}</h1>
        <p className="mt-3 text-lg text-brand">{profile.headline}</p>
      </header>

      <div className="mt-12 flex flex-col gap-16">
        <Section id="biography" title={t.about.bioTitle}>
          <Prose paragraphs={profile.longBio} />
        </Section>

        <Section id="skills" title={t.about.skillsTitle}>
          <div className="flex flex-col gap-10">
            <SkillGroups profile={profile} />

            <div className="rule-top pt-6">
              <h3 className="text-sm font-semibold tracking-wide uppercase text-faint">
                {t.about.tierLegendTitle}
              </h3>
              <div className="mt-3">
                <SkillTierLegend profile={profile} />
              </div>
            </div>

            <div className="rule-top pt-6">
              <h3 className="text-sm font-semibold tracking-wide uppercase text-faint">
                {t.about.alsoListedTitle}
              </h3>
              <div className="mt-3">
                <AlsoListedSkills profile={profile} />
              </div>
            </div>
          </div>
        </Section>

        <Section id="education" title={t.about.educationTitle}>
          <p className="max-w-measure text-pretty text-muted">{profile.education.summary}</p>
          <p className="mt-3 text-sm text-faint">
            {profile.education.degree}
            <span aria-hidden> · </span>
            {profile.education.institution}
            <span aria-hidden> · </span>
            <time dateTime={education.start}>{education.start}</time>
            <span aria-hidden> – </span>
            <time dateTime={education.end}>{education.end}</time>
          </p>
        </Section>

        <Section id="languages" title={t.about.languagesTitle}>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-muted">
            {profile.languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </Section>
      </div>

      <p className="mt-16">
        <Link
          href={routes.experience(locale)}
          className="text-brand underline decoration-border underline-offset-4"
        >
          {t.about.experienceLink}
        </Link>
      </p>

      <JsonLd
        data={graph(
          profilePageJsonLd({
            locale,
            path: '/about',
            name: meta.title,
            description: meta.description,
          }),
          breadcrumbJsonLd(trail, { locale, path: '/about' }),
        )}
      />
    </article>
  )
}

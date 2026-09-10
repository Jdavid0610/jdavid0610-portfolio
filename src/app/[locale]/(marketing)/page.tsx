import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { siteConfig } from '@/shared/config/site'
import { buildMetadata } from '@/shared/lib/seo'
import { getPageMeta } from '@/modules/pages/content'
import { routes } from '@/shared/lib/routes'
import { graph, JsonLd, profilePageJsonLd } from '@/shared/lib/json-ld'
import { Prose } from '@/shared/ui/prose'
import { Section } from '@/shared/ui/section'
import { getProfile } from '@/modules/profile/content'
import { getProjects, getProjectsCopy } from '@/modules/projects/content'
import { getOpenSourceCopy, getTemplates } from '@/modules/open-source/content'
import { getFaq } from '@/modules/faq/content'
import { ProjectCard } from '@/modules/projects/ui/project-card'
import { TemplateCard } from '@/modules/open-source/ui/template-card'

/**
 * Where each portrait chip sits once there is room for it. Below `lg` the
 * chips are a normal wrapped row, so these only apply from that breakpoint.
 */
const chipPlacement = [
  'lg:absolute lg:top-6 lg:-left-4 drift-a',
  'lg:absolute lg:bottom-16 lg:-right-6 drift-b',
  'lg:absolute lg:bottom-2 lg:left-8 drift-c',
]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const meta = getPageMeta(locale, 'home')
  return buildMetadata({
    locale,
    path: '',
    title: meta.title,
    description: meta.description,
  })
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const meta = getPageMeta(locale, 'home')
  const t = getDictionary(locale)
  const profile = getProfile(locale)
  const projectsCopy = getProjectsCopy(locale)
  const projects = getProjects(locale).slice(0, 3)
  const openSourceCopy = getOpenSourceCopy(locale)
  const templates = getTemplates(locale).slice(0, 3)
  const faq = getFaq(locale).slice(0, 4)

  return (
    <>
      <section
        aria-labelledby="hero-heading"
        className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16 lg:py-24"
      >
        <div>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface py-1.5 pl-[0.6875rem] pr-[0.8125rem] font-mono text-[0.71875rem] uppercase tracking-[0.07em] text-faint">
            <span aria-hidden className="live-dot" />
            {t.home.availabilityLabel} {profile.location}
            <span aria-hidden> · </span>
            {profile.workMode}
          </p>

          <h1
            id="hero-heading"
            className="mt-6 text-[2.75rem] font-bold leading-[1.02] tracking-[-0.033em] sm:text-6xl"
          >
            {profile.name.full}
          </h1>

          <p className="mt-4 font-mono text-sm text-brand">{profile.headline}</p>

          <Prose paragraphs={profile.heroBio} className="mt-6" />

          <p className="mt-7 max-w-[30rem] border-l-2 border-brand pl-[1.125rem] font-display text-lg font-medium leading-snug text-pretty">
            {profile.positioning.statement}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={routes.projects(locale)} className="cta">
              {t.home.projectsLink}
            </Link>
            <Link href={routes.about(locale)} className="cta-ghost">
              {t.home.resumeCta}
            </Link>
          </div>
        </div>

        <div className="group grid place-items-center lg:relative">
          <span aria-hidden className="portrait-ring hidden size-[18.75rem] lg:block" />
          <span
            aria-hidden
            className="portrait-ring portrait-ring-turn hidden size-[22.375rem] border-dashed opacity-60 lg:block"
          />
          <span
            aria-hidden
            className="portrait-ring portrait-ring-grow hidden size-[26rem] opacity-35 lg:block"
          />

          <div className="portrait-frame size-52 sm:size-60 lg:size-[15.75rem]">
            <Image
              src="/avatar.jpg"
              alt={t.home.portraitAlt}
              width={440}
              height={440}
              priority
              sizes="(min-width: 1024px) 252px, 240px"
              className="size-full rounded-full object-cover"
            />
          </div>

          <ul className="mt-7 flex flex-wrap justify-center gap-2 lg:mt-0 lg:block">
            {profile.heroFacts.map((fact, index) => (
              <li key={fact.label} className={`portrait-chip ${chipPlacement[index] ?? ''}`}>
                <b className="font-medium text-fg">{fact.value}</b>
                {fact.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label={t.home.statsLabel} className="rule-top border-b border-border">
        <dl className="grid grid-cols-2 sm:grid-cols-4">
          {profile.stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`stat-cell border-border ${index % 2 === 0 ? 'border-r' : ''} ${index < 2 ? 'border-b sm:border-b-0' : ''} sm:border-r sm:last:border-r-0`}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-3xl font-semibold tracking-[-0.025em]">
                  {stat.value}
                </span>
                <span className="mt-1.5 block font-mono text-[0.6875rem] uppercase leading-tight tracking-[0.05em] text-faint">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <Section id="pillars" title={t.home.pillarsTitle} className="py-16">
        <ol className="grid gap-4 sm:grid-cols-3">
          {profile.positioning.pillars.map((pillar, index) => (
            <li key={pillar.title} className="lift-card p-6">
              <p aria-hidden className="font-mono text-[0.6875rem] text-faint">
                0{index + 1}
              </p>
              <h3 className="mt-3 font-display text-[1.0625rem] font-semibold">{pillar.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-pretty text-muted">
                {pillar.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="featured-projects"
        title={t.home.projectsTitle}
        className="py-16"
        actions={
          <Link href={routes.projects(locale)} className="link-arrow">
            {t.home.projectsLink}
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="size-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        }
      >
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} copy={projectsCopy} locale={locale} />
          ))}
        </div>
      </Section>

      <Section
        id="featured-open-source"
        title={t.home.openSourceTitle}
        description={openSourceCopy.dogfoodLine}
        className="py-16"
        actions={
          <Link href={routes.openSource(locale)} className="link-arrow">
            {t.home.openSourceLink}
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="size-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        }
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {templates.map((template) => (
            <TemplateCard
              key={template.slug}
              template={template}
              copy={openSourceCopy}
              locale={locale}
            />
          ))}
        </div>
      </Section>

      <Section
        id="home-faq"
        title={t.home.faqTitle}
        className="py-16"
        actions={
          <Link href={routes.faq(locale)} className="link-arrow">
            {t.home.faqLink}
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="size-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        }
      >
        <dl className="flex flex-col gap-6">
          {faq.map((entry) => (
            <div key={entry.id}>
              <dt className="font-display font-semibold">{entry.question}</dt>
              <dd className="mt-1.5 max-w-measure text-pretty text-muted">{entry.answer}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="home-contact" title={t.home.contactTitle} className="py-16 pb-6">
        <div className="group lift-card flex flex-wrap items-center gap-7 p-8">
          <Image
            src="/github-avatar.jpg"
            alt={t.home.githubAvatarAlt}
            width={124}
            height={124}
            sizes="62px"
            className="size-[3.875rem] shrink-0 -rotate-3 rounded-xl border border-border object-cover transition duration-[420ms] group-hover:rotate-3"
          />
          <p className="max-w-measure min-w-60 flex-1 text-pretty text-muted">
            {profile.contactIntro}
          </p>
          <a href={`mailto:${siteConfig.email}`} className="cta">
            {t.home.contactCta}
          </a>
        </div>
      </Section>

      {/*
        `ProfilePage` is the correct type for a page about a person, which is
        what a personal portfolio home page is. `Person` and `WebSite` are
        already in the graph from the root layout.
      */}
      <JsonLd
        data={graph(
          profilePageJsonLd({
            locale,
            path: '',
            name: profile.name.full,
            description: meta.description,
          }),
        )}
      />
    </>
  )
}

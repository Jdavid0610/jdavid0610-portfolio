import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { siteConfig } from '@/shared/config/site'
import { buildMetadata } from '@/shared/lib/seo'
import { getPageMeta } from '@/modules/pages/content'
import { routes } from '@/shared/lib/routes'
import { breadcrumbs } from '@/shared/lib/breadcrumbs'
import { breadcrumbJsonLd, contactPageJsonLd, graph, JsonLd } from '@/shared/lib/json-ld'
import { BreadcrumbTrail } from '@/shared/ui/breadcrumb-trail'
import { Section } from '@/shared/ui/section'
import { getProfile } from '@/modules/profile/content'



export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const meta = getPageMeta(locale, 'contact')
  return buildMetadata({
    locale,
    path: '/contact',
    title: meta.title,
    description: meta.description,
  })
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const meta = getPageMeta(locale, 'contact')
  const t = getDictionary(locale)
  const profile = getProfile(locale)
  const trail = breadcrumbs(locale, t, [{ name: t.nav.contact, path: routes.contact(locale) }])

  return (
    <div className="py-10">
      <BreadcrumbTrail items={trail} label={t.nav.footerLabel} />

      <header className="mt-6">
        <h1 className="text-3xl font-semibold sm:text-4xl">{meta.title}</h1>
        <p className="mt-4 max-w-measure text-pretty text-muted">{profile.contactIntro}</p>
      </header>

      <div className="mt-12 flex flex-col gap-16">
        <Section id="channels" title={t.contact.channelsTitle}>
          {/*
            A real `<address>`, with unobfuscated `mailto:` and `tel:` links.
            The phone number appears here and nowhere else on the site; the
            email is deliberately plain text because an answer engine has to be
            able to read it.
          */}
          <address className="not-italic">
            <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-[minmax(0,10rem)_1fr]">
              {profile.channels.map((channel) => (
                <div key={channel.key} className="contents">
                  <dt className="text-sm font-medium text-faint">
                    {profile.contactLabels[channel.key]}
                  </dt>
                  <dd className="text-pretty">
                    {channel.href ? (
                      <a
                        href={channel.href}
                        rel={
                          channel.key === 'linkedin' || channel.key === 'github'
                            ? 'me noopener'
                            : undefined
                        }
                        className="break-words text-brand underline decoration-border underline-offset-4"
                      >
                        {channel.display}
                      </a>
                    ) : (
                      channel.display
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </address>

          <p className="mt-8">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-block rounded bg-brand px-4 py-2 text-sm font-medium text-brand-fg transition hover:opacity-90"
            >
              {t.contact.emailCta}
            </a>
          </p>
        </Section>

        <Section id="availability" title={t.contact.availabilityTitle}>
          <p className="max-w-measure text-pretty text-muted">
            {profile.workMode}. {profile.location}.
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
            {profile.languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </Section>
      </div>

      <JsonLd
        data={graph(
          contactPageJsonLd({
            locale,
            path: '/contact',
            name: meta.title,
            description: meta.description,
          }),
          breadcrumbJsonLd(trail, { locale, path: '/contact' }),
        )}
      />
    </div>
  )
}

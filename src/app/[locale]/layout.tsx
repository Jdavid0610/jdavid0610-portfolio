import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from 'next/font/google'
import { notFound } from 'next/navigation'
import { Providers } from '@/shared/providers'
import { siteConfig } from '@/shared/config/site'
import { isLocale, locales, localeTags, type Locale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { graph, JsonLd, personJsonLd, websiteJsonLd } from '@/shared/lib/json-ld'
import { buildMetadata } from '@/shared/lib/seo'
import { getProfile, education, knowsAbout } from '@/modules/profile/content'
import { InlineScript } from '@/shared/ui/inline-script'
import '@/styles/globals.css'

/**
 * Three faces, each with one job: Space Grotesk sets headlines, IBM Plex Sans
 * carries reading copy, IBM Plex Mono labels metadata. The CSS variables are
 * consumed by the `--font-*` theme tokens in `globals.css`.
 */
const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-grotesk',
  display: 'swap',
})
const plex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex',
  display: 'swap',
})
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

const fontVariables = `${grotesk.variable} ${plex.variable} ${plexMono.variable}`

/**
 * Applies a stored theme choice before the first paint.
 *
 * Dark is the CSS default, so only an explicit "light" needs writing — but it
 * has to happen before the browser paints, or a light-mode visitor sees a dark
 * flash on every navigation. An inline, synchronous script in `<head>` is the
 * only thing that runs that early; `<html suppressHydrationWarning>` covers the
 * attribute React did not render.
 *
 * Rendered through `InlineScript`, which explains why it is a raw script tag
 * and not `next/script`.
 */
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}})()`

/**
 * `[locale]` is a root parameter: it is the outermost segment, so this file is
 * the app's root layout and every page below inherits the language, the
 * dictionary and the client providers from here.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const profile = getProfile(locale)

  return {
    // Makes every relative URL below (canonicals, OG images) absolute.
    metadataBase: new URL(siteConfig.url),
    // No global suffix: several page titles already name him, and a template
    // would push them past the 60-character budget.
    title: { default: `${siteConfig.name} — ${profile.titles[0]}`, template: '%s' },
    applicationName: siteConfig.name,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    creator: siteConfig.author.name,
    ...buildMetadata({ locale, path: '', description: profile.oneLineBio }),
  }
}

/** Dark is the site's default, so it is the unconditional theme colour. */
export const viewport: Viewport = {
  themeColor: '#111318',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const typedLocale: Locale = locale
  const dictionary = getDictionary(typedLocale)
  const profile = getProfile(typedLocale)

  return (
    <html
      lang={localeTags[typedLocale]}
      className={fontVariables}
      /**
       * `globals.css` sets `scroll-behavior: smooth` for in-page anchors. This
       * attribute tells the router about it, so a route change jumps to the top
       * instead of animating the whole page there.
       */
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={themeScript} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brand focus:px-3 focus:py-2 focus:text-brand-fg"
        >
          {dictionary.common.skipToContent}
        </a>
        <Providers locale={typedLocale} dictionary={dictionary}>
          {children}
        </Providers>

        {/*
          The root of the graph, present on every page. One `@graph` with `@id`
          cross-references lets an engine resolve "the Person who authored this"
          by following a reference rather than guessing from proximity.
        */}
        <JsonLd
          data={graph(
            personJsonLd({
              locale: typedLocale,
              description: profile.oneLineBio,
              jobTitles: profile.titles,
              knowsAbout: knowsAbout(),
              degreeName: profile.education.degree,
              institution: education.institution,
              mainEntityOfPagePath: '/about',
            }),
            websiteJsonLd(typedLocale, siteConfig.description),
          )}
        />
      </body>
    </html>
  )
}

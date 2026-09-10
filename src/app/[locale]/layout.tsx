import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { Providers } from '@/shared/providers'
import { siteConfig } from '@/shared/config/site'
import { isLocale, locales, localeTags, type Locale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { buildMetadata } from '@/shared/lib/seo'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

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

  return {
    // Makes every relative URL below (canonicals, OG images) absolute.
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} — ${siteConfig.description.split(':')[0]}`,
      template: `%s · ${siteConfig.name}`,
    },
    applicationName: siteConfig.name,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    creator: siteConfig.author.name,
    formatDetection: { telephone: false },
    ...buildMetadata({ locale, path: '' }),
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#141619' },
  ],
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

  return (
    <html lang={localeTags[typedLocale]} className={inter.variable} suppressHydrationWarning>
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
      </body>
    </html>
  )
}

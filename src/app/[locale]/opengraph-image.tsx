import { ImageResponse } from 'next/og'
import { siteConfig } from '@/shared/config/site'
import { isLocale, locales } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = siteConfig.name

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

/**
 * Social card, rendered at request time and cached. Generated rather than
 * hand-designed so the headline always matches the active locale.
 */
export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = getDictionary(isLocale(locale) ? locale : 'en')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: 'linear-gradient(135deg, #0f172a 0%, #312e81 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.7 }}>{siteConfig.name}</div>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1, marginTop: 24 }}>
          {t.marketing.heroTitle}
        </div>
        <div style={{ fontSize: 28, opacity: 0.75, marginTop: 28 }}>
          {siteConfig.url.replace(/^https?:\/\//, '')}
        </div>
      </div>
    ),
    size,
  )
}

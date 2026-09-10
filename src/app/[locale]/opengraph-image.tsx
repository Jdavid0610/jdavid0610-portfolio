import { ImageResponse } from 'next/og'
import { siteConfig } from '@/shared/config/site'
import { isLocale, locales } from '@/shared/i18n/config'
import { getProfile } from '@/modules/profile/content'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = siteConfig.fullName

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

/**
 * Social card, generated rather than hand-designed so the headline always
 * matches the active locale and no image asset can go stale. Typographic on
 * purpose: a deliberate type-only card reads better than a placeholder photo.
 */
export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const profile = getProfile(isLocale(locale) ? locale : 'en')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#0f1319',
          color: '#f5f7fa',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 26, letterSpacing: 2, color: '#8fa6c4', textTransform: 'uppercase' }}>
            {profile.location}
          </div>
          <div style={{ fontSize: 82, fontWeight: 700, lineHeight: 1.05, marginTop: 26 }}>
            {siteConfig.fullName}
          </div>
          <div style={{ fontSize: 34, color: '#9fc0e8', marginTop: 24, lineHeight: 1.3 }}>
            {profile.titles.join('  ·  ')}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: '2px solid #2a3341',
            paddingTop: 28,
            fontSize: 26,
            color: '#8fa6c4',
          }}
        >
          <div style={{ display: 'flex' }}>{siteConfig.url.replace(/^https?:\/\//, '')}</div>
          <div style={{ display: 'flex' }}>{siteConfig.handle}</div>
        </div>
      </div>
    ),
    size,
  )
}

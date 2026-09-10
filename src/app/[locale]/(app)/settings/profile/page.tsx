import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { requireSession } from '@/server/auth/session'
import { isLocale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { buildMetadata } from '@/shared/lib/seo'
import { Card, CardHeader } from '@/shared/ui/card'
import { ProfileForm } from '@/modules/auth/ui/profile-form'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return buildMetadata({
    locale,
    path: '/settings/profile',
    title: getDictionary(locale).nav.settings,
    noIndex: true,
  })
}

export default async function ProfileSettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const session = await requireSession()
  const t = getDictionary(locale)

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader title={t.nav.settings} description={t.auth.name} />
        <ProfileForm user={session.user} />
      </Card>
    </div>
  )
}

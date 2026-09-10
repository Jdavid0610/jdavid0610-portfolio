import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { buildMetadata } from '@/shared/lib/seo'
import { env } from '@/server/env'
import { SignInForm } from '@/modules/auth/ui/sign-in-form'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ callbackUrl?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  // Auth pages carry no content worth indexing and should never rank.
  return buildMetadata({
    locale,
    path: '/sign-in',
    title: getDictionary(locale).auth.signInTitle,
    noIndex: true,
  })
}

export default async function SignInPage({ params, searchParams }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const { callbackUrl } = await searchParams
  const t = getDictionary(locale)

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1 text-center">
        <h1 className="text-2xl font-semibold">{t.auth.signInTitle}</h1>
        <p className="text-sm text-muted">{t.auth.signInSubtitle}</p>
      </header>
      <SignInForm callbackUrl={callbackUrl} showOAuth={Boolean(env.GITHUB_CLIENT_ID)} />
    </div>
  )
}

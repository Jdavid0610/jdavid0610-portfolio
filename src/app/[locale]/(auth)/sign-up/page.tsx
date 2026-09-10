import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { buildMetadata } from '@/shared/lib/seo'
import { env } from '@/server/env'
import { SignUpForm } from '@/modules/auth/ui/sign-up-form'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ callbackUrl?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return buildMetadata({
    locale,
    path: '/sign-up',
    title: getDictionary(locale).auth.signUpTitle,
    noIndex: true,
  })
}

export default async function SignUpPage({ params, searchParams }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const { callbackUrl } = await searchParams
  const t = getDictionary(locale)

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1 text-center">
        <h1 className="text-2xl font-semibold">{t.auth.signUpTitle}</h1>
        <p className="text-sm text-muted">{t.auth.signUpSubtitle}</p>
      </header>
      <SignUpForm callbackUrl={callbackUrl} showOAuth={Boolean(env.GITHUB_CLIENT_ID)} />
    </div>
  )
}

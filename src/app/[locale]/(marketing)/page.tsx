import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { buildMetadata } from '@/shared/lib/seo'
import { routes } from '@/shared/lib/routes'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getDictionary(locale)
  return buildMetadata({ locale, path: '', title: t.marketing.heroTitle })
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)

  return (
    <>
      <section className="mx-auto max-w-5xl px-4 py-24 text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          {t.marketing.heroTitle}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted text-pretty">
          {t.marketing.heroSubtitle}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={routes.signUp(locale)}>
            <Button size="lg">{t.marketing.heroCta}</Button>
          </Link>
          <Link href={routes.docs(locale)}>
            <Button size="lg" variant="secondary">
              {t.marketing.heroSecondary}
            </Button>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-24">
        <h2 className="mb-6 text-xl font-semibold">{t.marketing.featuresTitle}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.marketing.features.map((feature) => (
            <Card key={feature.title}>
              <h3 className="font-medium">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}

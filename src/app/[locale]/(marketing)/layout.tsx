import { notFound } from 'next/navigation'
import { isLocale } from '@/shared/i18n/config'
import { SiteFooter } from '@/shared/layout/site-footer'
import { SiteHeader } from '@/shared/layout/site-header'

/**
 * Public shell — deliberately free of `headers()`, `cookies()` and any session
 * read, because a single one of those anywhere in this subtree would turn every
 * route below it dynamic and cost the prerendering the whole AI-crawler story
 * depends on. Verify with `pnpm build`: `●` is prerendered, `ƒ` is per-request.
 *
 * The atmosphere layer lives here rather than in the pages so it can span the
 * full viewport width — `main` is a centred measure, and a backdrop clipped to
 * a text column reads as a mistake. It is purely decorative and carries no
 * content, so it is hidden from assistive technology.
 */
export default async function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <div className="relative flex min-h-dvh flex-col">
      {/*
        `overflow-hidden` would cut a blurred bloom off at a hard line, so the
        layer carries its own bottom fade and is tall enough that both blooms
        finish inside it. The grid keeps its separate radial mask.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[64rem] overflow-hidden [mask-image:linear-gradient(to_bottom,black_58%,transparent)]"
      >
        <div className="grid-field" />
        <div className="bloom -top-44 -right-24 h-[26rem] w-[39rem]" />
        <div className="bloom top-[30rem] -left-40 h-[19rem] w-[24rem] opacity-[0.18]" />
      </div>

      <SiteHeader locale={locale} />
      <main id="main" className="relative mx-auto w-full max-w-3xl flex-1 px-4 lg:max-w-5xl">
        {children}
      </main>
      <SiteFooter locale={locale} />
    </div>
  )
}

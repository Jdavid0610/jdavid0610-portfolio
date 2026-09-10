import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from '@/shared/i18n/config'
import { siteConfig } from '@/shared/config/site'
import { routes } from '@/shared/lib/routes'
import type { OpenSourceCopy, Template } from '../domain/types'

/**
 * A repository card. It leads with the GitHub avatar because that is how these
 * are recognised in the wild — the same picture sits on every one of his repos,
 * so the card reads as a real listing rather than a styled link.
 */
export function TemplateCard({
  template,
  copy,
  locale,
  level = 3,
}: {
  template: Template
  copy: OpenSourceCopy
  locale: Locale
  /** `h2` on the index, `h3` inside a home-page section. No level is skipped. */
  level?: 2 | 3
}) {
  const Heading = level === 2 ? 'h2' : 'h3'

  return (
    <article className="group lift-card flex flex-col p-5">
      <div className="flex items-center gap-3">
        <Image
          src="/github-avatar.jpg"
          alt={copy.labels.avatarAlt}
          width={88}
          height={88}
          sizes="44px"
          className="size-11 shrink-0 rounded-[0.6875rem] border border-border object-cover transition duration-[420ms] group-hover:-rotate-6 group-hover:scale-105 group-hover:border-brand"
        />
        <div className="min-w-0">
          <Heading className="truncate font-mono text-sm font-medium">
            <Link href={routes.template(locale, template.slug)} className="hover:text-brand">
              <span className="absolute inset-0" aria-hidden />
              {template.name}
            </Link>
          </Heading>
          <p className="mt-0.5 font-mono text-[0.6875rem] text-faint">{siteConfig.handle}</p>
        </div>
      </div>

      <p className="mt-3.5 text-pretty text-sm leading-relaxed text-muted">
        {template.definition}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 font-mono text-[0.6875rem] text-faint">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="size-2 rounded-full bg-brand" />
          {template.programmingLanguage}
        </span>
        <span>
          {copy.labels.stars}: {template.stars}
        </span>
        {template.poweringThisSite ? (
          <span className="rounded border border-live/40 bg-live/10 px-2 py-1 uppercase tracking-[0.05em] text-live">
            {copy.labels.poweringThisSite}
          </span>
        ) : null}
      </div>
    </article>
  )
}

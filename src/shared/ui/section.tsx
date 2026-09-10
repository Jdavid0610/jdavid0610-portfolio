import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

/**
 * A real landmark with an accessible name. The heading is rendered inside the
 * section and referenced by `aria-labelledby`, so the accessibility tree — the
 * structure machines actually read — matches the visible outline.
 *
 * It always renders an `h2`, one level below the page's single `h1`. Deeper
 * headings inside a section are written as plain `h3`/`h4` elements at the
 * point of use, which keeps the level visible in the markup rather than hidden
 * behind a prop.
 */
export function Section({
  id,
  title,
  description,
  children,
  className,
  actions,
}: {
  id: string
  title: string
  description?: ReactNode
  children: ReactNode
  className?: string
  actions?: ReactNode
}) {
  const headingId = `${id}-heading`

  return (
    <section id={id} aria-labelledby={headingId} className={cn('scroll-mt-24', className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 id={headingId} className="text-xl font-semibold sm:text-2xl">
          {title}
        </h2>
        {actions}
      </div>
      {description ? (
        <p className="mt-2 max-w-measure text-pretty text-muted">{description}</p>
      ) : null}
      <div className="mt-6">{children}</div>
    </section>
  )
}

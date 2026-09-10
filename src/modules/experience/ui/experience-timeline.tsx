import { formatMonth, monthsBetween } from '@/shared/lib/format'
import type { Locale } from '@/shared/i18n/config'
import { cn } from '@/shared/lib/cn'
import type { ExperienceCopy, Role } from '../domain/types'

/**
 * Overlapping bars, drawn to scale.
 *
 * The roles genuinely overlap — founder work alongside employment, and two
 * parallel contracts — and a single-track list would read as a data-entry
 * error. Each role gets its own full-width track, so the layout survives a
 * 375px screen, and the bar's offset and length encode the real dates.
 *
 * Every date is also written out in text inside the row, because a fact that
 * exists only as a bar's position does not exist for a reader who cannot see it.
 */
export function ExperienceTimeline({
  roles,
  copy,
  locale,
  today,
}: {
  roles: readonly Role[]
  copy: ExperienceCopy
  locale: Locale
  /** `YYYY-MM`, passed in so the component stays pure. */
  today: string
}) {
  const starts = roles.map((role) => role.start)
  const ends = roles.map((role) => role.end ?? today)
  const first = starts.reduce((a, b) => (a < b ? a : b))
  const last = ends.reduce((a, b) => (a > b ? a : b))
  const span = Math.max(monthsBetween(first, last), 1)

  const firstYear = Number(first.slice(0, 4))
  const lastYear = Number(last.slice(0, 4))
  const years = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => firstYear + i)

  return (
    <div className="flex flex-col gap-4">
      <ol className="flex flex-col gap-4">
        {roles.map((role) => {
          const end = role.end ?? today
          const offset = (monthsBetween(first, role.start) / span) * 100
          const width = Math.max((monthsBetween(role.start, end) / span) * 100, 3)

          return (
            <li key={role.slug} className="flex flex-col gap-1.5">
              <div className="flex flex-wrap items-baseline gap-x-2 text-sm">
                <a
                  href={`#${role.slug}`}
                  className="font-medium underline decoration-border underline-offset-4 transition hover:decoration-border-strong"
                >
                  {role.title}
                </a>
                <span className="text-faint">{role.employer}</span>
                <span className="text-xs text-faint">
                  <time dateTime={role.start}>{formatMonth(role.start, locale)}</time>
                  <span aria-hidden> – </span>
                  {role.end ? (
                    <time dateTime={role.end}>{formatMonth(role.end, locale)}</time>
                  ) : (
                    copy.presentLabel
                  )}
                </span>
              </div>

              <div
                aria-hidden
                className="relative h-2.5 overflow-hidden rounded-full bg-subtle ring-1 ring-border"
              >
                <div
                  className={cn(
                    'absolute inset-y-0 rounded-full',
                    role.bucket === 'venture' ? 'bg-brand' : 'bg-border-strong',
                  )}
                  style={{ left: `${offset}%`, width: `${width}%` }}
                />
              </div>
            </li>
          )
        })}
      </ol>

      <div aria-hidden className="flex justify-between border-t border-border pt-1.5 text-xs text-faint">
        {years.map((year) => (
          <span key={year}>{year}</span>
        ))}
      </div>

      <p className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-faint">
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="size-2 rounded-full bg-brand" />
          {copy.bucketLabels.venture}
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="size-2 rounded-full bg-border-strong" />
          {copy.bucketLabels.employment}
        </span>
      </p>
    </div>
  )
}

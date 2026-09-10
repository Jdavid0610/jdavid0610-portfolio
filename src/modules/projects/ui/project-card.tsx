import Link from 'next/link'
import type { Locale } from '@/shared/i18n/config'
import { routes } from '@/shared/lib/routes'
import type { Project, ProjectsCopy } from '../domain/types'

/**
 * An `<article>` per project, because that is what it is. The definition
 * sentence is the card body: the first sentence after a heading is the
 * most-extracted string on a page, so it is spent on a definition rather than
 * a hook.
 *
 * The whole card is the target — a stretched link over the surface — so the
 * hover state can belong to the card rather than to a small piece of text,
 * while the accessible name still comes from the heading.
 */
export function ProjectCard({
  project,
  copy,
  locale,
  level = 3,
}: {
  project: Project
  copy: ProjectsCopy
  locale: Locale
  /**
   * Heading level. The index page renders these cards directly under its `h1`,
   * so they are `h2` there; on the home page they sit inside a section's `h2`
   * and are `h3`. Skipping a level merges two topics for an extractor.
   */
  level?: 2 | 3
}) {
  const Heading = level === 2 ? 'h2' : 'h3'

  return (
    <article className="group lift-card p-6">
      <div className="flex items-start gap-5">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <Heading className="font-display text-lg font-semibold">
              <Link href={routes.project(locale, project.slug)} className="hover:text-brand">
                {/* Covers the card, so the pointer target is the whole surface. */}
                <span className="absolute inset-0" aria-hidden />
                {project.name}
              </Link>
            </Heading>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.05em] text-faint">
              {copy.bucketLabels[project.bucket]}
              <span aria-hidden> · </span>
              {copy.statusLabels[project.status]}
            </p>
          </div>

          <p className="mt-2.5 max-w-measure text-pretty text-muted">{project.definition}</p>

          <p className="mt-3.5 text-sm text-faint">
            <span className="font-medium">{copy.sectionLabels.role}:</span> {project.role}
          </p>
        </div>

        <span aria-hidden className="go-dot mt-0.5 hidden sm:grid">
          <svg
            viewBox="0 0 24 24"
            className="size-[0.9375rem]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </article>
  )
}

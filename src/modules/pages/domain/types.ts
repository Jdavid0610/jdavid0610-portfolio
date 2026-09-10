/**
 * Per-route titles and descriptions, as typed data.
 *
 * They live here rather than inline in each `page.tsx` for three reasons: the
 * whole per-route metadata table is auditable in one place, a missing Spanish
 * title is a compile error like every other translation, and a test can hold
 * every string to its budget — a title over 60 characters or a description over
 * 155 is truncated in a result page, which is a defect rather than a taste
 * question.
 */
export type PageKey =
  | 'home'
  | 'about'
  | 'projects'
  | 'openSource'
  | 'experience'
  | 'faq'
  | 'contact'
  | 'blog'

export type PageMeta = {
  /** ≤ 60 characters. */
  title: string
  /** ≤ 155 characters. */
  description: string
}

export type PagesCopy = Record<PageKey, PageMeta>

export const TITLE_MAX = 60
export const DESCRIPTION_MAX = 155

import { localeTags, type Locale } from '@/shared/i18n/config'

/**
 * Date formatting for calendar dates.
 *
 * Everything here is a **date without a time**: `2023-07` from a résumé,
 * `2026-09-10` from a repository. Such a value is parsed as UTC midnight, so
 * the formatter must also be told to read it in UTC — otherwise a viewer west
 * of Greenwich sees the previous day, and `2017-08` renders as "July 2017".
 *
 * Intl formatters are expensive to construct; each one is cached per locale.
 */
const dateFormatters = new Map<string, Intl.DateTimeFormat>()
const monthFormatters = new Map<string, Intl.DateTimeFormat>()

export function formatDate(value: string | Date | null, locale: Locale): string {
  if (!value) return '—'
  let formatter = dateFormatters.get(locale)
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(localeTags[locale], {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    })
    dateFormatters.set(locale, formatter)
  }
  return formatter.format(typeof value === 'string' ? new Date(value) : value)
}

/**
 * Formats a `YYYY-MM` string. The résumé prints months without days, so no day
 * is invented — the ISO string stays in the content and only the display form
 * is localized.
 */
export function formatMonth(value: string, locale: Locale): string {
  const [year, month] = value.split('-').map(Number)
  if (!year || !month) return value
  let formatter = monthFormatters.get(locale)
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(localeTags[locale], {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    })
    monthFormatters.set(locale, formatter)
  }
  return formatter.format(new Date(Date.UTC(year, month - 1, 1)))
}

/** Formats a `YYYY-MM-DD` string without shifting it into a local timezone. */
export function formatIsoDate(value: string, locale: Locale): string {
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return value
  return formatDate(new Date(Date.UTC(year, month - 1, day)), locale)
}

/** Whole months between two `YYYY-MM` values, used to lay out the timeline. */
export function monthsBetween(from: string, to: string): number {
  const [fromYear = 0, fromMonth = 1] = from.split('-').map(Number)
  const [toYear = 0, toMonth = 1] = to.split('-').map(Number)
  return (toYear - fromYear) * 12 + (toMonth - fromMonth)
}

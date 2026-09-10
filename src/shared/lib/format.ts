import { localeTags, type Locale } from '@/shared/i18n/config'

/**
 * Intl formatters are expensive to construct; cache one per locale+kind so a
 * long list does not build a hundred of them.
 */
const dateFormatters = new Map<string, Intl.DateTimeFormat>()

export function formatDate(value: string | Date | null, locale: Locale): string {
  if (!value) return '—'
  const key = `${locale}:date`
  let formatter = dateFormatters.get(key)
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(localeTags[locale], {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    dateFormatters.set(key, formatter)
  }
  return formatter.format(typeof value === 'string' ? new Date(value) : value)
}

export function formatRelative(value: string | Date, locale: Locale): string {
  const date = typeof value === 'string' ? new Date(value) : value
  const diffSeconds = Math.round((date.getTime() - Date.now()) / 1000)
  const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ['year', 31_536_000],
    ['month', 2_592_000],
    ['day', 86_400],
    ['hour', 3600],
    ['minute', 60],
  ]
  const rtf = new Intl.RelativeTimeFormat(localeTags[locale], { numeric: 'auto' })
  for (const [unit, seconds] of units) {
    if (Math.abs(diffSeconds) >= seconds) return rtf.format(Math.round(diffSeconds / seconds), unit)
  }
  return rtf.format(diffSeconds, 'second')
}

// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { formatDate, formatIsoDate, formatMonth, monthsBetween } from '@/shared/lib/format'

/**
 * Regression cover for a real defect: these values are calendar dates with no
 * time, so formatting them in the viewer's timezone shifted them backwards.
 * `2017-08` rendered as "July 2017" for anyone west of Greenwich, which is
 * exactly the kind of quietly wrong date an answer engine would repeat.
 */
describe('calendar-date formatting', () => {
  it('formats a YYYY-MM month without shifting it a month backwards', () => {
    expect(formatMonth('2017-08', 'en')).toBe('August 2017')
    expect(formatMonth('2022-06', 'en')).toBe('June 2022')
    expect(formatMonth('2020-07', 'en')).toBe('July 2020')
    expect(formatMonth('2023-07', 'es')).toBe('julio de 2023')
  })

  it('formats a YYYY-MM-DD date without shifting it a day backwards', () => {
    expect(formatIsoDate('2026-09-10', 'en')).toBe('Sep 10, 2026')
    expect(formatIsoDate('2024-12-01', 'en')).toBe('Dec 1, 2024')
  })

  it('leaves a malformed value alone rather than inventing a date', () => {
    expect(formatMonth('not-a-date', 'en')).toBe('not-a-date')
    expect(formatIsoDate('2026-09', 'en')).toBe('2026-09')
    expect(formatDate(null, 'en')).toBe('—')
  })

  it('counts whole months between two YYYY-MM values', () => {
    expect(monthsBetween('2020-07', '2021-11')).toBe(16)
    expect(monthsBetween('2023-07', '2023-07')).toBe(0)
  })
})

import { describe, expect, it } from 'vitest'
import { matchLocale } from '@/shared/i18n/config'
import { en } from '@/shared/i18n/dictionaries/en'
import { es } from '@/shared/i18n/dictionaries/es'

describe('matchLocale', () => {
  it('falls back to the default when nothing matches', () => {
    expect(matchLocale('de-DE,de;q=0.9')).toBe('en')
    expect(matchLocale(null)).toBe('en')
  })

  it('picks the highest-quality supported language', () => {
    expect(matchLocale('fr;q=0.9,es-CO;q=0.8')).toBe('es')
    expect(matchLocale('es-419,es;q=0.9,en;q=0.5')).toBe('es')
  })
})

describe('dictionaries', () => {
  it('translates every key in every locale', () => {
    const keys = (obj: object, prefix = ''): string[] =>
      Object.entries(obj).flatMap(([key, value]) =>
        typeof value === 'object' && value !== null
          ? keys(value, `${prefix}${key}.`)
          : [`${prefix}${key}`],
      )
    expect(keys(es).sort()).toEqual(keys(en).sort())
  })
})

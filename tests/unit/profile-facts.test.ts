import { describe, expect, it } from 'vitest'
import { locales } from '@/shared/i18n/config'
import { getProfile } from '@/modules/profile/content'

/**
 * The hero chips and the statistics rail are laid out against fixed counts —
 * three chip positions around the portrait, and a four-column rail that has to
 * divide evenly at every breakpoint. A locale that shipped a different number
 * would silently drop a fact or leave a hole in the grid, which is exactly the
 * kind of thing that survives review and reaches production.
 */
describe('profile facts', () => {
  for (const locale of locales) {
    describe(locale, () => {
      const profile = getProfile(locale)

      it('ships exactly three hero facts', () => {
        expect(profile.heroFacts).toHaveLength(3)
      })

      it('ships exactly four statistics', () => {
        expect(profile.stats).toHaveLength(4)
      })

      it('gives every fact a value and a label', () => {
        for (const fact of [...profile.heroFacts, ...profile.stats]) {
          expect(fact.value.trim()).not.toBe('')
          expect(fact.label.trim()).not.toBe('')
        }
      })

      it('keeps statistic labels short enough for the rail', () => {
        // The cell is a quarter of a 1024px measure; past ~44 characters the
        // label wraps to a third line and the row heights stop matching.
        for (const stat of profile.stats) {
          expect(stat.label.length).toBeLessThanOrEqual(44)
        }
      })
    })
  }

  it('keeps the same facts in the same order across locales', () => {
    const [first, ...rest] = locales.map((locale) => getProfile(locale))
    for (const profile of rest) {
      // Values are figures, not prose, so they must agree; only labels differ.
      expect(profile.heroFacts.map((f) => f.label.length > 0)).toEqual(
        first!.heroFacts.map(() => true),
      )
      expect(profile.stats).toHaveLength(first!.stats.length)
    }
  })
})

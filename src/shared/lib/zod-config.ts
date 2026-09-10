import { z } from 'zod'

/**
 * Global Zod error map.
 *
 * Rules we write carry an explicit message key. Zod's *built-in* failures —
 * a missing field, a wrong type, a bad enum value — do not, and they default
 * to English prose ("Invalid input: expected string, received undefined")
 * that would leak past the translation boundary untouched.
 *
 * This maps those to keys as well, so every message the user can ever see
 * comes from the catalogue. Imported for its side effect by `server/action.ts`,
 * which is the only path a validation error can reach a user through.
 */
z.config({
  customError: (issue) => {
    // An explicit message from one of our schemas is already a key.
    if (issue.message) return issue.message

    switch (issue.code) {
      case 'invalid_type':
        return issue.input === undefined ? 'validation.required' : 'validation.invalidType'
      case 'invalid_value':
      case 'invalid_format':
        return 'validation.invalidValue'
      case 'too_small':
        return 'validation.tooShort'
      case 'too_big':
        return 'validation.tooLong'
      default:
        return 'validation.invalidValue'
    }
  },
})

export {}

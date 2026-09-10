// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { signInSchema, signUpSchema } from '@/modules/auth/domain/schemas'
import { createPostSchema } from '@/modules/posts/domain/schemas'
import { fieldErrorsOf } from '@/server/action' // also installs the global Zod error map
import { en } from '@/shared/i18n/dictionaries/en'
import { translateFieldErrors, translateMessage } from '@/shared/i18n/messages'

/**
 * Regression cover for the bug where form errors stayed English on /es:
 * schemas emit keys, and the boundary translates them per locale.
 */
describe('validation messages', () => {
  it('emits message keys, never prose', () => {
    const result = signUpSchema.safeParse({
      name: 'A',
      email: 'not-an-email',
      password: 'short',
      confirmPassword: 'mismatch',
    })

    expect(result.success).toBe(false)
    for (const issue of result.error!.issues) {
      expect(issue.message).toMatch(/^validation\./)
    }
  })

  it('every key a schema can emit exists in the catalogue', () => {
    const schemas = [signInSchema, signUpSchema, createPostSchema]
    const emitted = new Set<string>()

    for (const schema of schemas) {
      const result = schema.safeParse({ email: 'x', password: '', title: '', slug: '!', content: '' })
      result.error?.issues.forEach((issue) => emitted.add(issue.message))
    }

    expect(emitted.size).toBeGreaterThan(0)
    for (const key of emitted) {
      expect(Object.keys(en.messages)).toContain(key)
    }
  })

  it('translates field errors into the requested locale', () => {
    const result = signInSchema.safeParse({ email: 'nope', password: '' })
    const fieldErrors = fieldErrorsOf(result.error!)

    expect(translateFieldErrors('en', fieldErrors)).toEqual({
      email: ['Enter a valid email address.'],
      password: ['Enter your password.'],
    })
    expect(translateFieldErrors('es', fieldErrors)).toEqual({
      email: ['Escribe un correo válido.'],
      password: ['Escribe tu contraseña.'],
    })
  })

  it('translates thrown error keys', () => {
    expect(translateMessage('es', 'error.postForbidden')).toBe('Esta publicación es de otra persona.')
    expect(translateMessage('es', 'error.generic')).toBe('Algo salió mal. Inténtalo de nuevo.')
  })

  it('passes an unknown message through instead of swallowing it', () => {
    expect(translateMessage('es', 'A message from some provider')).toBe(
      'A message from some provider',
    )
  })
})

import { describe, expect, it } from 'vitest'
import { signInSchema, signUpSchema } from '@/modules/auth/domain/schemas'

describe('signUpSchema', () => {
  const valid = {
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    password: 'analytic1',
    confirmPassword: 'analytic1',
  }

  it('accepts a well-formed sign-up', () => {
    expect(signUpSchema.safeParse(valid).success).toBe(true)
  })

  it('rejects mismatched passwords on the confirm field', () => {
    const result = signUpSchema.safeParse({ ...valid, confirmPassword: 'different1' })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0]?.path).toEqual(['confirmPassword'])
  })

  it('requires a digit in the password', () => {
    const result = signUpSchema.safeParse({
      ...valid,
      password: 'onlyletters',
      confirmPassword: 'onlyletters',
    })
    expect(result.success).toBe(false)
  })
})

describe('signInSchema', () => {
  it('rejects an invalid email', () => {
    expect(signInSchema.safeParse({ email: 'nope', password: 'x' }).success).toBe(false)
  })
})

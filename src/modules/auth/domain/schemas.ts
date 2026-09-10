import { z } from 'zod'

/**
 * Shared by the client form and the server action — one definition, so the
 * browser can never submit something the server would reject differently.
 *
 * Messages are message *keys*, not prose. A schema is a module-level constant
 * evaluated once at import time, so it cannot know the locale of the request
 * that will fail against it; the action pipeline translates the keys on the
 * way back out. See `shared/i18n/messages.ts`.
 */
export const signInSchema = z.object({
  email: z.email('validation.email'),
  password: z.string().min(1, 'validation.passwordRequired'),
  callbackUrl: z.string().optional(),
})

export const signUpSchema = z
  .object({
    name: z.string().min(2, 'validation.nameMin').max(80, 'validation.nameMax'),
    email: z.email('validation.email'),
    password: z
      .string()
      .min(8, 'validation.passwordMin')
      .max(128, 'validation.passwordMax')
      .regex(/[a-zA-Z]/, 'validation.passwordLetter')
      .regex(/[0-9]/, 'validation.passwordNumber'),
    confirmPassword: z.string(),
    callbackUrl: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'validation.passwordMismatch',
    path: ['confirmPassword'],
  })

export const updateProfileSchema = z.object({
  name: z.string().min(2, 'validation.nameMin').max(80, 'validation.nameMax'),
})

export type SignInInput = z.infer<typeof signInSchema>
export type SignUpInput = z.infer<typeof signUpSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>

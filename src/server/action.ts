import 'server-only'

import { z } from 'zod'
import '@/shared/lib/zod-config'
import { type ActionState, idleState } from '@/shared/lib/action-state'
import { getCurrentLocale, getSession, requireRole, type Role, type Session } from '@/server/auth/session'
import { translateFieldErrors, translateMessage } from '@/shared/i18n/messages'
import { UnauthorizedError, isAppError, isFrameworkError, ValidationError } from '@/server/errors'

/** Re-exported so server code has a single import for the action toolkit. */
export { idleState }
export type { ActionState }


type Ctx<TAuth extends AuthMode> = TAuth extends 'public'
  ? { session: Session | null }
  : { session: Session }

type AuthMode = 'public' | 'required' | Role

type Handler<TInput, TData, TAuth extends AuthMode> = (args: {
  input: TInput
  ctx: Ctx<TAuth>
}) => Promise<TData>

async function resolveContext(mode: AuthMode): Promise<{ session: Session | null }> {
  if (mode === 'public') return { session: await getSession() }
  if (mode === 'required') {
    const session = await getSession()
    if (!session) throw new UnauthorizedError()
    return { session }
  }
  return { session: await requireRole(mode) }
}

/**
 * The one place message keys become text. Everything below throws keys; the
 * user sees prose in their own language.
 */
async function toActionError(error: unknown): Promise<ActionState<never>> {
  const locale = await getCurrentLocale()

  if (error instanceof ValidationError) {
    return {
      status: 'error',
      message: translateMessage(locale, error.message),
      fieldErrors: translateFieldErrors(locale, error.fieldErrors),
    }
  }
  if (isAppError(error)) return { status: 'error', message: translateMessage(locale, error.message) }

  // Anything unmapped is a bug: log the detail, show the user nothing internal.
  console.error('[action] unhandled error', error)
  return { status: 'error', message: translateMessage(locale, 'error.generic') }
}

/**
 * Wraps a Server Action with validation → auth → execution → error mapping,
 * so the action body only ever contains business intent.
 */
export function createAction<TSchema extends z.ZodType, TData, TAuth extends AuthMode = 'public'>(config: {
  input: TSchema
  auth?: TAuth
  handler: Handler<z.infer<TSchema>, TData, TAuth>
}) {
  return async (rawInput: unknown): Promise<ActionState<TData>> => {
    try {
      const parsed = config.input.safeParse(rawInput)
      if (!parsed.success) {
        throw new ValidationError('error.fields', fieldErrorsOf(parsed.error))
      }
      const ctx = (await resolveContext(config.auth ?? ('public' as TAuth))) as Ctx<TAuth>
      const data = await config.handler({ input: parsed.data, ctx })
      return { status: 'success', data }
    } catch (error) {
      if (isFrameworkError(error)) throw error
      return toActionError(error)
    }
  }
}

/**
 * Same pipeline, shaped for `useActionState`: takes (prevState, FormData) and
 * coerces the form payload before validation.
 */
export function createFormAction<TSchema extends z.ZodType, TData, TAuth extends AuthMode = 'public'>(config: {
  input: TSchema
  auth?: TAuth
  handler: Handler<z.infer<TSchema>, TData, TAuth>
}) {
  const action = createAction(config)
  return async (_prev: ActionState<TData>, formData: FormData): Promise<ActionState<TData>> =>
    action(formDataToObject(formData))
}

export function formDataToObject(formData: FormData): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      out[key] = value
      continue
    }
    // Unchecked checkboxes are simply absent; checked ones arrive as "on".
    const existing = out[key]
    if (existing === undefined) out[key] = value
    else if (Array.isArray(existing)) existing.push(value)
    else out[key] = [existing, value]
  }
  return out
}

export function fieldErrorsOf(error: z.ZodError): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {}
  for (const issue of error.issues) {
    const key = issue.path.join('.') || '_form'
    ;(fieldErrors[key] ??= []).push(issue.message)
  }
  return fieldErrors
}

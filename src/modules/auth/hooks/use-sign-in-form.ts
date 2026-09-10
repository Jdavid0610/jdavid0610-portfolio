'use client'

import { useActionState } from 'react'
import { idleState, type ActionState } from '@/shared/lib/action-state'
import { signInAction } from '../actions'

/**
 * All sign-in logic: submission, pending state, server errors, field errors.
 *
 * The component that renders the form imports this and nothing else — swap
 * the visual design and the behaviour is untouched; test this hook and the
 * behaviour is covered without rendering a single input.
 */
export function useSignInForm({ callbackUrl }: { callbackUrl?: string } = {}) {
  const [state, formAction, isPending] = useActionState<ActionState<void>, FormData>(
    signInAction,
    idleState,
  )

  const fieldErrors = state.status === 'error' ? (state.fieldErrors ?? {}) : {}

  return {
    formAction,
    isPending,
    callbackUrl,
    /** Form-level message: wrong credentials, provider outage, rate limit. */
    error: state.status === 'error' && !Object.keys(fieldErrors).length ? state.message : null,
    fieldErrors,
    errorsFor: (field: string) => fieldErrors[field],
  }
}

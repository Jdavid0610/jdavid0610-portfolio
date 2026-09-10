'use client'

import { useActionState } from 'react'
import { idleState, type ActionState } from '@/shared/lib/action-state'
import { signUpAction } from '../actions'

export function useSignUpForm({ callbackUrl }: { callbackUrl?: string } = {}) {
  const [state, formAction, isPending] = useActionState<ActionState<void>, FormData>(
    signUpAction,
    idleState,
  )

  const fieldErrors = state.status === 'error' ? (state.fieldErrors ?? {}) : {}

  return {
    formAction,
    isPending,
    callbackUrl,
    error: state.status === 'error' && !Object.keys(fieldErrors).length ? state.message : null,
    fieldErrors,
    errorsFor: (field: string) => fieldErrors[field],
  }
}

'use client'

import { useActionState, useEffect } from 'react'
import { idleState, type ActionState } from '@/shared/lib/action-state'
import { toast } from '@/shared/lib/toast'
import { updateProfileAction } from '../actions'
import type { SessionUser } from '../domain/types'

/**
 * Unlike sign-in, this action stays on the page, so the hook also exposes a
 * success message — the difference between "submitted" and "saved".
 */
export function useProfileForm(user: SessionUser) {
  const [state, formAction, isPending] = useActionState<ActionState<SessionUser>, FormData>(
    updateProfileAction,
    idleState,
  )

  /**
   * Raising the toast in an effect — rather than during render — keeps it to
   * one per successful submission: render can run many times for the same
   * state, while the effect re-runs only when `useActionState` hands back a
   * new state object, which is once per submission.
   *
   * Saving twice with the same value must still confirm twice, so this
   * deliberately keys on the state itself and not on its contents; the store
   * turns the second one into a refreshed toast rather than a stacked pair.
   */
  useEffect(() => {
    if (state.status !== 'success') return
    toast.success('toast.profileSaved')
  }, [state])

  const fieldErrors = state.status === 'error' ? (state.fieldErrors ?? {}) : {}

  return {
    defaultName: state.status === 'success' ? state.data.name : user.name,
    email: user.email,
    formAction,
    isPending,
    error: state.status === 'error' && !Object.keys(fieldErrors).length ? state.message : null,
    errorsFor: (field: string) => fieldErrors[field],
  }
}

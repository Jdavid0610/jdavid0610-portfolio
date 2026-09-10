/**
 * The wire contract between Server Actions and the hooks that call them.
 *
 * It lives in `shared/` — not in `server/` — because client hooks need the
 * type *and* the `idleState` value. Importing them from the server module
 * would pull the database driver into the browser bundle.
 */
export type ActionState<TData = void> =
  | { status: 'idle' }
  | { status: 'success'; data: TData; message?: string }
  | { status: 'error'; message: string; fieldErrors?: Record<string, string[]> }

export const idleState = { status: 'idle' } as const

/** Narrowing helpers, so components never re-implement the checks. */
export function isSuccess<T>(state: ActionState<T>): state is { status: 'success'; data: T; message?: string } {
  return state.status === 'success'
}

export function fieldErrorsOfState(state: ActionState<unknown>): Record<string, string[]> {
  return state.status === 'error' ? (state.fieldErrors ?? {}) : {}
}

/** A form-level message is an error with no field to attach it to. */
export function formErrorOfState(state: ActionState<unknown>): string | null {
  if (state.status !== 'error') return null
  return Object.keys(state.fieldErrors ?? {}).length ? null : state.message
}

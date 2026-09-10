/**
 * Global toast store.
 *
 * Deliberately framework-agnostic: no React import, no context, no provider to
 * thread through. That is what lets `toast.success(…)` be called from a hook,
 * an event handler, a `catch` block, or a plain utility function — anywhere on
 * the client — without the caller knowing where the UI lives.
 *
 * React subscribes to it through `useSyncExternalStore` (see
 * `shared/hooks/use-toasts.ts`), which is the supported way to read from an
 * external store without tearing during concurrent rendering.
 *
 * Titles and descriptions may be **message keys** (`toast.postDeleted`). They
 * are stored raw and translated at render time by the component, so a toast
 * queued in one language cannot render stale text after a locale switch.
 */
export type ToastTone = 'success' | 'error' | 'info'

export type Toast = {
  id: string
  tone: ToastTone
  /** Message key or literal text. */
  title: string
  description?: string
  /** Milliseconds before auto-dismiss; `Infinity` to require a click. */
  duration: number
  createdAt: number
}

export type ToastOptions = {
  description?: string
  duration?: number
  /** Supply to update an existing toast in place instead of stacking a new one. */
  id?: string
}

/** More than a handful on screen is noise, not feedback. */
const MAX_VISIBLE = 4
const DEFAULT_DURATION = 5_000
/** Errors linger: they are the ones worth reading twice. */
const ERROR_DURATION = 8_000

/** A stable empty array, so the server snapshot never changes identity. */
const EMPTY: readonly Toast[] = Object.freeze([])

let toasts: readonly Toast[] = EMPTY
const listeners = new Set<() => void>()

function notify(next: readonly Toast[]): void {
  toasts = next
  for (const listener of listeners) listener()
}

export function subscribeToToasts(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getToasts(): readonly Toast[] {
  return toasts
}

export function getToastsServerSnapshot(): readonly Toast[] {
  return EMPTY
}

let counter = 0
function nextId(): string {
  counter += 1
  return `toast-${counter}`
}

let warnedAboutServer = false

function show(tone: ToastTone, title: string, options: ToastOptions = {}): string {
  /**
   * The store is module state. On the server that state would be shared by
   * every concurrent request, so emitting there is always a bug — signal from
   * a Server Action by returning an `ActionState` and let the calling hook
   * raise the toast.
   */
  if (typeof window === 'undefined') {
    if (!warnedAboutServer) {
      warnedAboutServer = true
      console.warn('[toast] ignored on the server — raise toasts from client code.')
    }
    return options.id ?? 'toast-noop'
  }

  const duration =
    options.duration ?? (tone === 'error' ? ERROR_DURATION : DEFAULT_DURATION)

  // Updating a known id replaces in place: "Saving…" can become "Saved."
  if (options.id) {
    const existing = toasts.find((entry) => entry.id === options.id)
    if (existing) {
      notify(
        toasts.map((entry) =>
          entry.id === options.id
            ? { ...entry, tone, title, description: options.description, duration, createdAt: Date.now() }
            : entry,
        ),
      )
      return options.id
    }
  }

  // Clicking a button twice should not stack two identical toasts; refresh the
  // one already on screen so its timer restarts.
  const duplicate = toasts.find(
    (entry) => entry.tone === tone && entry.title === title && entry.description === options.description,
  )
  if (duplicate) {
    notify(
      toasts.map((entry) =>
        entry.id === duplicate.id ? { ...entry, createdAt: Date.now(), duration } : entry,
      ),
    )
    return duplicate.id
  }

  const toast: Toast = {
    id: options.id ?? nextId(),
    tone,
    title,
    description: options.description,
    duration,
    createdAt: Date.now(),
  }

  // Newest first; the oldest falls off the end once the stack is full.
  notify([toast, ...toasts].slice(0, MAX_VISIBLE))
  return toast.id
}

function dismiss(id: string): void {
  const next = toasts.filter((entry) => entry.id !== id)
  if (next.length !== toasts.length) notify(next)
}

function clear(): void {
  if (toasts.length) notify(EMPTY)
}

/**
 * The public API. Import it anywhere on the client:
 *
 *   import { toast } from '@/shared/lib/toast'
 *   toast.success('toast.postDeleted')
 */
export const toast = {
  success: (title: string, options?: ToastOptions) => show('success', title, options),
  error: (title: string, options?: ToastOptions) => show('error', title, options),
  info: (title: string, options?: ToastOptions) => show('info', title, options),
  show: (tone: ToastTone, title: string, options?: ToastOptions) => show(tone, title, options),
  dismiss,
  clear,
}

/** Test-only: drops every toast and resets the id counter. */
export function resetToastsForTests(): void {
  toasts = EMPTY
  counter = 0
  listeners.clear()
}

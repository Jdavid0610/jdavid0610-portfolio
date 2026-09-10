'use client'

import { useEffect, useRef, useState } from 'react'
import { useMessage, useTranslations } from '@/shared/i18n/i18n-provider'
import { cn } from '@/shared/lib/cn'
import { toast as toastApi, type Toast } from '@/shared/lib/toast'
import { useToasts } from '@/shared/hooks/use-toasts'

const tones = {
  success: { border: 'border-success/40', text: 'text-success', mark: '✓' },
  error: { border: 'border-danger/40', text: 'text-danger', mark: '!' },
  info: { border: 'border-border', text: 'text-muted', mark: 'i' },
} as const

/**
 * The single mount point for toasts, rendered once by `Providers`.
 *
 * The list is `aria-live="polite"` so additions are announced without
 * interrupting; error toasts additionally carry `role="alert"`, which is
 * assertive, because a failure is worth interrupting for.
 */
export function Toaster() {
  const t = useTranslations()
  const toasts = useToasts()

  return (
    <ol
      aria-live="polite"
      aria-label={t.toast.region}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-center gap-2 p-4 sm:inset-x-auto sm:right-0 sm:items-end"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </ol>
  )
}

function ToastItem({ toast }: { toast: Toast }) {
  const t = useTranslations()
  const message = useMessage()
  const [isPaused, setIsPaused] = useState(false)

  // Remaining time survives pauses, so hovering does not restart the countdown.
  const remaining = useRef(toast.duration)
  // Seeded in the effect below — reading the clock during render is impure.
  const startedAt = useRef(0)

  useEffect(() => {
    if (isPaused || !Number.isFinite(remaining.current)) return

    startedAt.current = Date.now()
    const timer = setTimeout(() => toastApi.dismiss(toast.id), Math.max(remaining.current, 0))

    return () => {
      clearTimeout(timer)
      remaining.current -= Date.now() - startedAt.current
    }
    // `createdAt` changes when a duplicate refreshes this toast: restart then.
  }, [isPaused, toast.id, toast.createdAt])

  const tone = tones[toast.tone]

  return (
    <li
      // A hovered or focused toast must not vanish mid-read.
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      role={toast.tone === 'error' ? 'alert' : undefined}
      className={cn(
        'toast-enter pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-card border bg-surface p-4 shadow-lg',
        tone.border,
      )}
    >
      <span
        aria-hidden
        className={cn(
          'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold',
          tone.border,
          tone.text,
        )}
      >
        {tone.mark}
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{message(toast.title)}</p>
        {toast.description ? (
          <p className="mt-0.5 text-sm text-muted">{message(toast.description)}</p>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => toastApi.dismiss(toast.id)}
        aria-label={t.toast.dismiss}
        className="-m-1 shrink-0 rounded p-1 text-muted transition hover:text-fg"
      >
        <span aria-hidden>×</span>
      </button>
    </li>
  )
}

import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

/**
 * Wraps a control with its label, hint and error, and wires the ARIA
 * relationships so the error is announced. Every form in the app uses it,
 * which is what keeps validation feedback consistent.
 */
export function Field({
  id,
  label,
  hint,
  errors,
  required,
  children,
  className,
}: {
  id: string
  label: string
  hint?: string
  errors?: string[]
  required?: boolean
  children: (props: {
    id: string
    'aria-invalid': boolean | undefined
    'aria-describedby': string | undefined
  }) => ReactNode
  className?: string
}) {
  const hasError = Boolean(errors?.length)
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy = [hint ? hintId : null, hasError ? errorId : null].filter(Boolean).join(' ')

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {/*
        The marker sits *outside* the <label>, not merely `aria-hidden` inside
        it: the label's text content is the control's accessible name, and
        "Password *" is not the name anyone means. The requirement is conveyed
        by the input's own `required` attribute.
      */}
      <span className="flex items-center gap-1 text-sm font-medium">
        <label htmlFor={id}>{label}</label>
        {required ? (
          <span aria-hidden className="text-danger">
            *
          </span>
        ) : null}
      </span>

      {children({
        id,
        'aria-invalid': hasError || undefined,
        'aria-describedby': describedBy || undefined,
      })}
      {hint ? (
        <p id={hintId} className="text-xs text-muted">
          {hint}
        </p>
      ) : null}
      {hasError ? (
        <p id={errorId} role="alert" className="text-xs text-danger">
          {errors?.[0]}
        </p>
      ) : null}
    </div>
  )
}

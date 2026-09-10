import { cn } from '@/shared/lib/cn'

export function Alert({
  tone = 'danger',
  children,
  className,
}: {
  tone?: 'danger' | 'success' | 'info'
  children: React.ReactNode
  className?: string
}) {
  const tones = {
    danger: 'border-danger/40 bg-danger/10 text-danger',
    success: 'border-success/40 bg-success/10 text-success',
    info: 'border-border bg-bg text-muted',
  } as const

  return (
    <div role="status" className={cn('rounded-lg border px-3 py-2 text-sm', tones[tone], className)}>
      {children}
    </div>
  )
}

import { cn } from '@/shared/lib/cn'

export function Badge({
  tone = 'neutral',
  children,
}: {
  tone?: 'neutral' | 'success'
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        tone === 'success' ? 'bg-success/15 text-success' : 'bg-border/60 text-muted',
      )}
    >
      {children}
    </span>
  )
}

import { cn } from '@/shared/lib/cn'

/**
 * A technology name. Rendered as text in a list rather than an image or an
 * icon, because a fact that exists only in a picture does not exist for a
 * crawler that never renders one.
 */
export function TagList({
  items,
  label,
  className,
}: {
  items: readonly string[]
  label: string
  className?: string
}) {
  return (
    <ul aria-label={label} className={cn('flex flex-wrap gap-1.5', className)}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded border border-border bg-subtle px-2 py-0.5 font-mono text-xs text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

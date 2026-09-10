import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

export type Definition = { label: string; value: ReactNode }

/**
 * Field-and-value pairs as a real `<dl>`. Semantic markup and machine
 * extraction want the same thing, so the accessible structure is also the
 * structure a parser reads.
 */
export function DefinitionList({
  items,
  className,
}: {
  items: readonly Definition[]
  className?: string
}) {
  return (
    <dl className={cn('grid gap-x-6 gap-y-3 sm:grid-cols-[minmax(0,12rem)_1fr]', className)}>
      {items.map((item) => (
        <div key={item.label} className="contents">
          <dt className="text-sm font-medium text-faint">{item.label}</dt>
          <dd className="text-sm text-pretty sm:mt-0">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

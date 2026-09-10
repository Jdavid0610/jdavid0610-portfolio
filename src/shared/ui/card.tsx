import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/lib/cn'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn('rounded-card border border-border bg-surface p-6 shadow-sm', className)}
    />
  )
}

export function CardHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-4 flex flex-col gap-1">
      <h2 className="text-lg font-semibold">{title}</h2>
      {description ? <p className="text-sm text-muted">{description}</p> : null}
    </div>
  )
}

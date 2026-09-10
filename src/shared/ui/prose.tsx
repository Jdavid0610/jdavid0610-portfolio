import { cn } from '@/shared/lib/cn'

/**
 * Renders an array of paragraphs at the site's one reading measure. Content
 * modules hold paragraphs as plain strings, so nothing in `content/` has to
 * know about markup.
 */
export function Prose({
  paragraphs,
  className,
}: {
  paragraphs: readonly string[]
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="max-w-measure text-pretty text-muted">
          {paragraph}
        </p>
      ))}
    </div>
  )
}

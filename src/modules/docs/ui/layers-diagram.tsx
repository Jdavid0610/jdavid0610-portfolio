import { cn } from '@/shared/lib/cn'
import type { DocBlock } from '../domain/types'

type LayersBlock = Extract<DocBlock, { type: 'layers' }>

/**
 * The dependency diagram.
 *
 * Drawn as a vertical stack rather than a left-to-right flow on purpose: the
 * direction is then the same at every screen width, the labels wrap instead of
 * overflowing, and a longer translation costs a line rather than a scrollbar.
 *
 * A server component — no JavaScript reaches the browser for it.
 */
export function LayersDiagram({ block }: { block: LayersBlock }) {
  return (
    <figure className="flex flex-col gap-3">
      <figcaption className="text-xs tracking-wide text-muted uppercase">
        {block.caption}
      </figcaption>

      <div
        role="group"
        aria-label={block.caption}
        className="rounded-card border border-border bg-bg p-4 sm:p-5"
      >
        <ol className="relative flex flex-col gap-3">
          {/* The rail behind the markers, drawn once so the steps read as one chain. */}
          <span
            aria-hidden
            className="absolute top-5 bottom-5 left-4 w-px -translate-x-1/2 bg-border"
          />

          {block.layers.map((layer, index) => (
            <li key={layer.folder} className="relative flex items-stretch gap-3">
              <span
                aria-hidden
                className={cn(
                  'z-10 mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold',
                  index === 0
                    ? 'border-brand bg-brand text-brand-fg'
                    : 'border-border bg-surface text-muted',
                )}
              >
                {index + 1}
              </span>

              <div className="min-w-0 flex-1 rounded-lg border border-border bg-surface px-4 py-3">
                <p className="font-mono text-sm font-semibold">{layer.folder}</p>
                <p className="mt-0.5 text-sm text-muted text-pretty">{layer.label}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* `shared/` is not a step in the chain, so it is drawn off it. */}
        <div className="mt-3 flex items-stretch gap-3">
          <span
            aria-hidden
            className="flex size-8 shrink-0 items-center justify-center text-lg leading-none text-muted"
          >
            ↳
          </span>
          <div className="min-w-0 flex-1 rounded-lg border border-dashed border-border px-4 py-3">
            <p className="font-mono text-sm font-semibold">{block.shared.folder}</p>
            <p className="mt-0.5 text-sm text-muted text-pretty">{block.shared.label}</p>
            <p className="mt-1 text-xs text-muted italic">{block.shared.note}</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted text-pretty">{block.rule}</p>
    </figure>
  )
}

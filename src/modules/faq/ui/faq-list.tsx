import type { FaqEntry } from '../domain/types'

/**
 * Rendered as `<details>` elements, which are open by default: the answers are
 * the payload of this page, so they must be in the DOM as text for a crawler
 * that never runs a script or clicks anything. The disclosure is a
 * convenience for a human reader, not a gate on the content.
 *
 * Each question is a heading inside its own `<summary>`, so the page still has
 * a walkable outline.
 */
export function FaqList({ entries }: { entries: readonly FaqEntry[] }) {
  return (
    <div className="flex flex-col">
      {entries.map((entry) => (
        <details key={entry.id} id={entry.id} open className="scroll-mt-24 rule-top py-5">
          <summary className="cursor-pointer list-none">
            <h2 className="inline text-base font-semibold">{entry.question}</h2>
          </summary>
          <p className="mt-2 max-w-measure text-pretty text-muted">{entry.answer}</p>
        </details>
      ))}
    </div>
  )
}

import { Alert } from '@/shared/ui/alert'
import type { DocBlock } from '../domain/types'
import { LayersDiagram } from './layers-diagram'
import { RuntimePanel } from './runtime-panel'

/**
 * Renders the structured content. A server component, so a documentation page
 * ships no JavaScript at all — except the one live panel, which opts in.
 */
export function DocBlocks({ blocks }: { blocks: DocBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  )
}

function Block({ block }: { block: DocBlock }) {
  switch (block.type) {
    case 'heading':
      return <h2 className="mt-4 text-xl font-semibold">{block.text}</h2>

    case 'paragraph':
      return <p className="leading-relaxed text-pretty">{block.text}</p>

    case 'list':
      return (
        <ul className="flex flex-col gap-2 pl-5">
          {block.items.map((item) => (
            <li key={item} className="list-disc leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      )

    case 'checklist':
      return (
        <ul className="grid gap-3 sm:grid-cols-2">
          {block.items.map((item) => (
            <li
              key={item.label}
              className="rounded-card border border-border bg-surface p-4 text-sm"
            >
              <p className="font-medium">{item.label}</p>
              <p className="mt-1 text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      )

    case 'code':
      return (
        <figure className="flex flex-col gap-1">
          {block.caption ? (
            <figcaption className="text-xs text-muted">{block.caption}</figcaption>
          ) : null}
          {/* Wide code scrolls inside its own box; the page never scrolls sideways. */}
          <pre className="overflow-x-auto rounded-card border border-border bg-surface p-4 text-xs leading-relaxed">
            <code>{block.code}</code>
          </pre>
        </figure>
      )

    case 'table':
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr>
                {block.head.map((cell) => (
                  <th key={cell} className="border-b border-border pb-2 pr-4 font-medium">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="border-b border-border py-2 pr-4 align-top text-muted"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'note':
      return <Alert tone={block.tone === 'warn' ? 'danger' : 'info'}>{block.text}</Alert>

    case 'layers':
      return <LayersDiagram block={block} />

    case 'runtime':
      return <RuntimePanel />
  }
}

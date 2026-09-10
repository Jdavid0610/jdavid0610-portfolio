import type { PostBlock } from '../domain/types'

/**
 * Renders a post body from typed blocks. Headings are `h2` because the post
 * title is the page's only `h1`, and no level is skipped.
 */
export function PostBlocks({ blocks }: { blocks: readonly PostBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`
        if (block.type === 'heading') {
          return (
            <h2 key={key} className="mt-4 text-xl font-semibold">
              {block.text}
            </h2>
          )
        }
        if (block.type === 'list') {
          return (
            <ul key={key} className="flex max-w-measure flex-col gap-2 pl-5">
              {block.items.map((item) => (
                <li key={item.slice(0, 40)} className="list-disc text-pretty text-muted">
                  {item}
                </li>
              ))}
            </ul>
          )
        }
        return (
          <p key={key} className="max-w-measure text-pretty text-muted">
            {block.text}
          </p>
        )
      })}
    </div>
  )
}

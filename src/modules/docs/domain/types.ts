/**
 * Documentation is content, so it is structured data rather than a blob of
 * markdown: no parser dependency, every page type-checked, and — like blog
 * posts — it must exist in every locale or the build fails.
 */
export type DocBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'checklist'; items: Array<{ label: string; detail: string }> }
  | { type: 'code'; caption?: string; code: string }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'note'; tone: 'info' | 'warn'; text: string }
  | { type: 'runtime' }
  /**
   * The layering diagram. Its labels live in the content files rather than in
   * the component, so it translates like everything else — and it is laid out
   * with real elements rather than ASCII, so it wraps on a phone and reads in
   * a language whose words are longer than English's.
   */
  | {
      type: 'layers'
      caption: string
      layers: Array<{ folder: string; label: string }>
      shared: { folder: string; label: string; note: string }
      rule: string
    }

export type DocPage = {
  slug: string
  title: string
  summary: string
  blocks: DocBlock[]
}

export type DocsContent = {
  title: string
  intro: string
  pages: DocPage[]
}

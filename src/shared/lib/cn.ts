/** Minimal class joiner — no dependency needed for `class-a ${cond && 'b'}`. */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ')
}

/**
 * An inline `<script>` that runs before the first paint without tripping
 * React's development warning.
 *
 * React warns when it meets a `<script>` tag in a component tree, because a
 * script rendered on the *client* never executes — so the warning is there to
 * stop you relying on one. Here the script only ever needs to run from the
 * server-rendered HTML, which is exactly the case the warning cannot
 * distinguish. Switching the `type` resolves it honestly: `text/javascript` in
 * the HTML the server sends, so the browser executes it before paint, and
 * `text/plain` on the client, so React sees an inert element with nothing to
 * warn about. `suppressHydrationWarning` covers the deliberate mismatch.
 *
 * This is the pattern Next.js documents for pre-hydration scripts. `next/script`
 * is not an alternative: in the App Router its `beforeInteractive` strategy
 * queues onto `self.__next_s` and is drained after hydration, far too late to
 * prevent a flash of the wrong theme.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

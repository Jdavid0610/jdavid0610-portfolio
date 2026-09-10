/**
 * Browser cookie helpers.
 *
 * They live outside React on purpose: `document.cookie` is external state, and
 * the React compiler rejects mutating it from inside a component or hook.
 */
export function setCookie(name: string, value: string, maxAgeSeconds: number): void {
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${maxAgeSeconds};samesite=lax`
}

export function readCookie(name: string): string | null {
  const match = document.cookie
    .split('; ')
    .find((entry) => entry.startsWith(`${name}=`))
    ?.slice(name.length + 1)
  return match ? decodeURIComponent(match) : null
}

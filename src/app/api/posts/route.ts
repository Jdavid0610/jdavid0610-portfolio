import { NextResponse, type NextRequest } from 'next/server'
import { getCurrentLocale, getSession } from '@/server/auth/session'
import { translateMessage } from '@/shared/i18n/messages'
import { isAppError } from '@/server/errors'
import { postFiltersSchema } from '@/modules/posts/domain/schemas'
import { serializePage } from '@/modules/posts/domain/types'
import * as postsService from '@/modules/posts/server/posts.service'

export const dynamic = 'force-dynamic'

/**
 * REST endpoint backing the client-side list (search, paging). It repeats the
 * session check rather than trusting the proxy — a route handler is reachable
 * directly, so it defends itself.
 */
export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const filters = postFiltersSchema.parse(Object.fromEntries(request.nextUrl.searchParams))

  try {
    const page = await postsService.listMine(session, filters)
    return NextResponse.json(serializePage(page), {
      headers: { 'Cache-Control': 'private, no-store' },
    })
  } catch (error) {
    if (isAppError(error)) {
      const locale = await getCurrentLocale()
      return NextResponse.json({ error: translateMessage(locale, error.message) }, { status: error.status })
    }
    console.error('[api/posts] unhandled error', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

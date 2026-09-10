import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Liveness, for container orchestrators and uptime checks.
 *
 * The site is fully prerendered from typed content and reads no database, so
 * "the process answers" is the whole of its health.
 */
export function GET() {
  return NextResponse.json({ status: 'ok', time: new Date().toISOString() })
}

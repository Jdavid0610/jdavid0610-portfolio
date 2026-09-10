import { NextResponse } from 'next/server'
import { sql } from 'drizzle-orm'
import { db } from '@/server/db'
import { isMockMode } from '@/server/mocks/config'

export const dynamic = 'force-dynamic'

/** Liveness + database reachability, for container orchestrators and uptime checks. */
export async function GET() {
  // Mock mode is reported explicitly so a deploy check can catch a demo build
  // that reached the wrong environment.
  if (isMockMode()) {
    return NextResponse.json({ status: 'ok', database: 'mocked', time: new Date().toISOString() })
  }

  try {
    await db.execute(sql`select 1`)
    return NextResponse.json({ status: 'ok', database: 'up', time: new Date().toISOString() })
  } catch {
    return NextResponse.json({ status: 'degraded', database: 'down' }, { status: 503 })
  }
}

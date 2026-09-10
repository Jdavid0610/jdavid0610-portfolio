import type { Role, Session, SessionUser } from '@/server/auth/session'

export type { Role, Session, SessionUser }

export function isAdmin(user: Pick<SessionUser, 'role'> | null | undefined): boolean {
  return user?.role === 'admin'
}

export function initialsOf(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

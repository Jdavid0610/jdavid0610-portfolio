'use client'

import { useSyncExternalStore } from 'react'
import {
  getToasts,
  getToastsServerSnapshot,
  subscribeToToasts,
  type Toast,
} from '@/shared/lib/toast'

/**
 * Subscribes React to the toast store.
 *
 * `useSyncExternalStore` is the supported bridge for external state: it keeps
 * the render consistent under concurrent rendering, and its server snapshot
 * lets the toaster prerender as empty rather than mismatching on hydration.
 */
export function useToasts(): readonly Toast[] {
  return useSyncExternalStore(subscribeToToasts, getToasts, getToastsServerSnapshot)
}

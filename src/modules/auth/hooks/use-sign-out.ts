'use client'

import { useTransition } from 'react'
import { signOutAction } from '../actions'

/** Sign-out is a mutation with a redirect, so it belongs in a transition. */
export function useSignOut() {
  const [isPending, startTransition] = useTransition()
  return {
    isPending,
    signOut: () => startTransition(() => void signOutAction()),
  }
}

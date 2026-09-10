'use client'

import { useState, useTransition } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from '@/shared/lib/toast'
import { deletePostAction } from '../actions'

/**
 * Deletion with an immediate UI response: the row disappears on click, and
 * only comes back if the server rejects the change.
 *
 * Feedback goes to a toast rather than an inline alert, because by the time
 * the server answers the row it referred to is already gone from the list —
 * there is no longer a sensible place to put the message.
 */
export function useDeletePost() {
  const [isPending, startTransition] = useTransition()
  const [removedIds, setRemovedIds] = useState<string[]>([])
  const queryClient = useQueryClient()

  function remove(id: string) {
    setRemovedIds((ids) => [...ids, id])

    startTransition(async () => {
      const result = await deletePostAction({ id })

      if (result.status === 'error') {
        setRemovedIds((ids) => ids.filter((removed) => removed !== id))
        // The action already translated this message.
        toast.error(result.message)
        return
      }

      // A message key: the toaster resolves it against the active locale.
      toast.success('toast.postDeleted', { description: 'toast.postDeletedDetail' })
      await queryClient.invalidateQueries({ queryKey: ['posts'] })
    })
  }

  return {
    remove,
    isPending,
    isRemoved: (id: string) => removedIds.includes(id),
  }
}

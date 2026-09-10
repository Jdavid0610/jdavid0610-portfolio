// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  getToasts,
  getToastsServerSnapshot,
  resetToastsForTests,
  subscribeToToasts,
  toast,
} from '@/shared/lib/toast'

/** The store is client-only; these tests give it a window to write into. */
beforeEach(() => {
  vi.stubGlobal('window', {})
  resetToastsForTests()
})

describe('toast store', () => {
  it('adds newest first', () => {
    toast.info('first')
    toast.info('second')

    expect(getToasts().map((entry) => entry.title)).toEqual(['second', 'first'])
  })

  it('notifies subscribers and stops after unsubscribing', () => {
    const listener = vi.fn()
    const unsubscribe = subscribeToToasts(listener)

    toast.success('one')
    expect(listener).toHaveBeenCalledTimes(1)

    unsubscribe()
    toast.success('two')
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('returns a new array identity on change and a stable one otherwise', () => {
    const before = getToasts()
    toast.info('changed')
    expect(getToasts()).not.toBe(before)

    const after = getToasts()
    toast.dismiss('does-not-exist')
    // No change means no re-render.
    expect(getToasts()).toBe(after)
  })

  it('refreshes a duplicate instead of stacking it', () => {
    const first = toast.error('Same message')
    const second = toast.error('Same message')

    expect(first).toBe(second)
    expect(getToasts()).toHaveLength(1)
  })

  it('treats toasts with different descriptions as distinct', () => {
    toast.info('Title', { description: 'a' })
    toast.info('Title', { description: 'b' })

    expect(getToasts()).toHaveLength(2)
  })

  it('updates in place when given a known id', () => {
    toast.info('Saving…', { id: 'save' })
    toast.success('Saved.', { id: 'save' })

    expect(getToasts()).toHaveLength(1)
    expect(getToasts()[0]).toMatchObject({ id: 'save', tone: 'success', title: 'Saved.' })
  })

  it('caps the stack at four, dropping the oldest', () => {
    for (const title of ['a', 'b', 'c', 'd', 'e']) toast.info(title)

    expect(getToasts().map((entry) => entry.title)).toEqual(['e', 'd', 'c', 'b'])
  })

  it('gives errors a longer default lifetime than successes', () => {
    const successId = toast.success('ok')
    const failureId = toast.error('nope')

    const success = getToasts().find((entry) => entry.id === successId)!
    const failure = getToasts().find((entry) => entry.id === failureId)!

    expect(failure.duration).toBeGreaterThan(success.duration)
  })

  it('honours an explicit duration, including Infinity', () => {
    toast.info('sticky', { duration: Number.POSITIVE_INFINITY })
    expect(getToasts()[0]?.duration).toBe(Number.POSITIVE_INFINITY)
  })

  it('dismisses and clears', () => {
    const id = toast.info('bye')
    toast.info('also')

    toast.dismiss(id)
    expect(getToasts()).toHaveLength(1)

    toast.clear()
    expect(getToasts()).toHaveLength(0)
  })

  it('is a no-op on the server, where module state is shared across requests', () => {
    vi.unstubAllGlobals()
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    toast.error('should not be stored')

    expect(getToasts()).toHaveLength(0)
    expect(warn).toHaveBeenCalled()
    warn.mockRestore()
  })

  it('always renders empty on the server snapshot', () => {
    toast.info('client only')
    expect(getToastsServerSnapshot()).toHaveLength(0)
    // A stable identity, so hydration does not loop.
    expect(getToastsServerSnapshot()).toBe(getToastsServerSnapshot())
  })
})

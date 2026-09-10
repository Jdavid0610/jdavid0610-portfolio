// @vitest-environment node
// Server modules read `typeof window` to refuse browser access to server env,
// so this file runs outside jsdom.
import { beforeEach, describe, expect, it, vi } from 'vitest'

/**
 * Mock mode is read from the environment at import time, so each scenario
 * needs a fresh module graph.
 */
async function loadMockRepo() {
  vi.resetModules()
  process.env.NEXT_PUBLIC_MOCK_MODE = 'on'
  return import('@/modules/posts/server/posts.repository.mock')
}

beforeEach(() => {
  delete (globalThis as { __mockPosts?: unknown }).__mockPosts
  process.env.MOCK_FAIL = ''
  process.env.MOCK_LATENCY_MS = '0'
})

describe('mock posts repository', () => {
  it('serves the published fixtures newest first', async () => {
    const { mockPostsRepository } = await loadMockRepo()
    const posts = await mockPostsRepository.findPublished('en')

    expect(posts).toHaveLength(2)
    expect(posts.every((post) => post.published && post.locale === 'en')).toBe(true)
    expect(posts[0]?.slug).toBe('where-authorization-actually-belongs')
  })

  it('hides drafts from the public listing but keeps them for the author', async () => {
    const { mockPostsRepository } = await loadMockRepo()

    const slugs = await mockPostsRepository.findPublishedSlugs('en')
    expect(slugs).not.toContain('draft-notes-on-caching')

    const mine = await mockPostsRepository.findByAuthor('mock-user-admin', {
      search: '',
      page: 1,
      status: 'draft',
    })
    expect(mine.items.map((post) => post.slug)).toEqual(['draft-notes-on-caching'])
  })

  it('persists writes so CRUD flows work without a database', async () => {
    const { mockPostsRepository } = await loadMockRepo()

    const created = await mockPostsRepository.insertPost({
      authorId: 'mock-user-admin',
      locale: 'en',
      title: 'Written in mock mode',
      slug: 'written-in-mock-mode',
      excerpt: '',
      content: 'body',
      published: true,
    })

    expect(await mockPostsRepository.slugExists('written-in-mock-mode', 'en')).toBe(true)
    expect((await mockPostsRepository.findPublished('en')).map((p) => p.id)).toContain(created.id)

    await mockPostsRepository.deletePost(created.id)
    expect(await mockPostsRepository.findById(created.id)).toBeNull()
  })

  it('excludes the post being edited from its own slug conflict check', async () => {
    const { mockPostsRepository } = await loadMockRepo()
    const [first] = await mockPostsRepository.findPublished('en')

    expect(await mockPostsRepository.slugExists(first!.slug, 'en')).toBe(true)
    expect(await mockPostsRepository.slugExists(first!.slug, 'en', first!.id)).toBe(false)
  })

  it('serves each locale its own content', async () => {
    const { mockPostsRepository } = await loadMockRepo()

    const [spanish] = await mockPostsRepository.findPublished('es')
    expect(spanish?.locale).toBe('es')
    expect(spanish?.title).toContain('autorización')

    // Translations of one post share a slug across locales.
    const english = await mockPostsRepository.findBySlug(spanish!.slug, 'en')
    expect(english?.title).toBe('Where authorization actually belongs')
  })

  it('reports only the locales a slug is published in', async () => {
    const { mockPostsRepository } = await loadMockRepo()

    expect((await mockPostsRepository.findLocalesForSlug('where-authorization-actually-belongs')).sort())
      .toEqual(['en', 'es'])
    // Drafts are not translations anyone can visit.
    expect(await mockPostsRepository.findLocalesForSlug('draft-notes-on-caching')).toEqual([])
  })

  it('scopes slug conflicts to a locale, so a translation may reuse the slug', async () => {
    const { mockPostsRepository } = await loadMockRepo()

    expect(await mockPostsRepository.slugExists('draft-notes-on-caching', 'en')).toBe(true)
    expect(await mockPostsRepository.slugExists('draft-notes-on-caching', 'es')).toBe(false)
  })

  it('injects failures for the operations named in MOCK_FAIL', async () => {
    process.env.MOCK_FAIL = 'posts.create'
    const { mockPostsRepository } = await loadMockRepo()

    await expect(
      mockPostsRepository.insertPost({
        authorId: 'mock-user-admin',
        locale: 'en',
        title: 'Nope',
        slug: 'nope',
        excerpt: '',
        content: 'x',
        published: false,
      }),
    ).rejects.toThrow(/Mock failure injected/)

    // Unlisted operations keep working.
    await expect(mockPostsRepository.findPublished('en')).resolves.toHaveLength(2)
  })
})

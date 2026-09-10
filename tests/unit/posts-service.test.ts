import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ForbiddenError, NotFoundError, ValidationError } from '@/server/errors'
import type { Session } from '@/server/auth/session'

vi.mock('@/modules/posts/server/posts.repository', () => ({
  findPublished: vi.fn(),
  findPublishedSlugs: vi.fn(),
  findBySlug: vi.fn(),
  findLocalesForSlug: vi.fn(),
  findById: vi.fn(),
  findByAuthor: vi.fn(),
  slugExists: vi.fn(),
  insertPost: vi.fn(),
  updatePost: vi.fn(),
  deletePost: vi.fn(),
}))

const repo = await import('@/modules/posts/server/posts.repository')
const service = await import('@/modules/posts/server/posts.service')

function sessionFor(id: string, role: 'user' | 'admin' = 'user'): Session {
  return {
    user: { id, name: 'Test', email: 't@example.com', image: null, role },
    expiresAt: new Date(Date.now() + 60_000),
  }
}

const draft = {
  id: '11111111-1111-4111-8111-111111111111',
  slug: 'draft',
  locale: 'en' as const,
  title: 'Draft',
  excerpt: '',
  content: 'body',
  published: false,
  publishedAt: null,
  updatedAt: new Date(),
  authorName: 'Owner',
  authorId: 'owner-1',
}

beforeEach(() => vi.resetAllMocks())

describe('getPublishedBySlug', () => {
  it('hides unpublished posts from the public route', async () => {
    vi.mocked(repo.findBySlug).mockResolvedValue(draft)
    await expect(service.getPublishedBySlug('draft', 'en')).rejects.toBeInstanceOf(NotFoundError)
  })

  it('returns a published post', async () => {
    vi.mocked(repo.findBySlug).mockResolvedValue({ ...draft, published: true })
    await expect(service.getPublishedBySlug('draft', 'en')).resolves.toMatchObject({ published: true })
  })
})

describe('locale scoping', () => {
  it('404s when the slug exists only in another language', async () => {
    // The repository is queried with (slug, locale); a miss is a real 404
    // rather than a silent fallback to English content on a Spanish URL.
    vi.mocked(repo.findBySlug).mockResolvedValue(null)

    await expect(service.getPublishedBySlug('only-in-english', 'es')).rejects.toBeInstanceOf(
      NotFoundError,
    )
    expect(repo.findBySlug).toHaveBeenCalledWith('only-in-english', 'es')
  })

  it('reports only the locales a post is really translated into', async () => {
    vi.mocked(repo.findLocalesForSlug).mockResolvedValue(['en'])
    await expect(service.listTranslations('only-in-english')).resolves.toEqual(['en'])
  })
})

describe('authorization', () => {
  it('refuses to edit someone else’s post', async () => {
    vi.mocked(repo.findById).mockResolvedValue(draft)
    await expect(service.getForEdit(sessionFor('intruder'), draft.id)).rejects.toBeInstanceOf(
      ForbiddenError,
    )
  })

  it('lets the owner edit', async () => {
    vi.mocked(repo.findById).mockResolvedValue(draft)
    await expect(service.getForEdit(sessionFor('owner-1'), draft.id)).resolves.toBeTruthy()
  })

  it('lets an admin edit anything', async () => {
    vi.mocked(repo.findById).mockResolvedValue(draft)
    await expect(service.getForEdit(sessionFor('someone', 'admin'), draft.id)).resolves.toBeTruthy()
  })

  it('refuses to delete someone else’s post', async () => {
    vi.mocked(repo.findById).mockResolvedValue(draft)
    await expect(service.remove(sessionFor('intruder'), draft.id)).rejects.toBeInstanceOf(
      ForbiddenError,
    )
    expect(repo.deletePost).not.toHaveBeenCalled()
  })
})

describe('create', () => {
  it('reports a duplicate slug as a field error', async () => {
    vi.mocked(repo.slugExists).mockResolvedValue(true)
    const promise = service.create(sessionFor('owner-1'), {
      locale: 'en',
      title: 'Hello',
      slug: 'hello',
      excerpt: '',
      content: 'x',
      published: false,
    })
    await expect(promise).rejects.toBeInstanceOf(ValidationError)
  })
})

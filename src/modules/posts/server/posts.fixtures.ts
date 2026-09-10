import 'server-only'

import { MOCK_IDENTITIES } from '@/shared/lib/mock-mode'
import type { PostDetail } from '../domain/types'

/**
 * Seed content for mock mode.
 *
 * The first two posts exist in both languages under the same slug — that is
 * what a translation is here, and it is what lets hreflang point somewhere
 * real. The third is English-only on purpose, so the "no translation
 * available" path is exercised too. Dates are fixed literals rather than
 * `new Date()` so screenshots and assertions stay stable across runs.
 */
const AUTHOR = MOCK_IDENTITIES.admin

function at(iso: string): Date {
  return new Date(iso)
}

export const postFixtures: PostDetail[] = [
  {
    id: '3f1b9f4c-0000-4000-8000-000000000001',
    slug: 'rendering-on-the-server-is-a-feature',
    locale: 'en',
    title: 'Rendering on the server is a feature, not a constraint',
    excerpt: 'Why every public page here ships HTML before it ships JavaScript.',
    content:
      'Server rendering is not a performance trick bolted onto a client app. It is the default that makes a page indexable, linkable and fast on a cold cache.\n\nThe rule in this template: anything a crawler should read is rendered on the server; anything a user clicks is hydrated on top.',
    published: true,
    publishedAt: at('2026-01-14T09:00:00.000Z'),
    updatedAt: at('2026-01-20T11:30:00.000Z'),
    authorName: AUTHOR.name,
    authorId: AUTHOR.id,
  },
  {
    id: '3f1b9f4c-0000-4000-8000-000000000011',
    slug: 'rendering-on-the-server-is-a-feature',
    locale: 'es',
    title: 'Renderizar en el servidor es una ventaja, no una limitación',
    excerpt: 'Por qué cada página pública aquí entrega HTML antes que JavaScript.',
    content:
      'Renderizar en el servidor no es un truco de rendimiento añadido a una aplicación de cliente. Es lo que hace que una página sea indexable, enlazable y rápida con la caché fría.\n\nLa regla en esta plantilla: todo lo que un rastreador deba leer se renderiza en el servidor; todo lo que una persona pulse se hidrata encima.',
    published: true,
    publishedAt: at('2026-01-14T09:00:00.000Z'),
    updatedAt: at('2026-01-20T11:30:00.000Z'),
    authorName: AUTHOR.name,
    authorId: AUTHOR.id,
  },
  {
    id: '3f1b9f4c-0000-4000-8000-000000000002',
    slug: 'where-authorization-actually-belongs',
    locale: 'en',
    title: 'Where authorization actually belongs',
    excerpt: 'A cookie check in the proxy is user experience. The data access layer is security.',
    content:
      'A proxy runs before the request reaches your code, which makes it a great place to redirect and a terrible place to decide who may read a row.\n\nPut the real check next to the data: one memoized session read, one ownership assertion in the service, and every entry point inherits both.',
    published: true,
    publishedAt: at('2026-02-02T08:15:00.000Z'),
    updatedAt: at('2026-02-02T08:15:00.000Z'),
    authorName: AUTHOR.name,
    authorId: AUTHOR.id,
  },
  {
    id: '3f1b9f4c-0000-4000-8000-000000000012',
    slug: 'where-authorization-actually-belongs',
    locale: 'es',
    title: 'Dónde va realmente la autorización',
    excerpt:
      'Revisar una cookie en el proxy es experiencia de usuario. La capa de acceso a datos es seguridad.',
    content:
      'Un proxy se ejecuta antes de que la petición llegue a tu código, lo que lo hace excelente para redirigir y pésimo para decidir quién puede leer una fila.\n\nPon la verificación real junto a los datos: una lectura de sesión memoizada, una comprobación de propiedad en el servicio, y cada punto de entrada hereda ambas.',
    published: true,
    publishedAt: at('2026-02-02T08:15:00.000Z'),
    updatedAt: at('2026-02-02T08:15:00.000Z'),
    authorName: AUTHOR.name,
    authorId: AUTHOR.id,
  },
  {
    id: '3f1b9f4c-0000-4000-8000-000000000003',
    slug: 'draft-notes-on-caching',
    locale: 'en',
    title: 'Draft: notes on caching I have not finished',
    excerpt: '',
    content: 'Unpublished on purpose — it proves the public routes filter drafts out.',
    published: false,
    publishedAt: null,
    updatedAt: at('2026-03-09T16:45:00.000Z'),
    authorName: AUTHOR.name,
    authorId: AUTHOR.id,
  },
]

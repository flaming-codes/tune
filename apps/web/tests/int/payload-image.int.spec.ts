import { describe, expect, it } from 'vitest'

import { getMediaUrl } from '@/components/PayloadImage'
import type { Media } from '@/payload-types'

describe('PayloadImage helpers', () => {
  it('falls back to the original URL when a requested size exists without a URL', () => {
    const media = {
      id: 1,
      alt: 'Seed-Bild',
      url: '/api/media/file/dog.webp',
      filename: 'dog.webp',
      mimeType: 'image/webp',
      filesize: 56028,
      width: 1024,
      height: 1024,
      focalX: 50,
      focalY: 50,
      createdAt: '2026-06-08T05:42:03.544Z',
      updatedAt: '2026-06-08T05:42:03.544Z',
      sizes: {
        hero: {
          url: null,
          width: null,
          height: null,
          mimeType: null,
          filesize: null,
          filename: null,
        },
      },
    } satisfies Media

    expect(getMediaUrl(media, 'hero')).toBe('/api/media/file/dog.webp')
  })
})

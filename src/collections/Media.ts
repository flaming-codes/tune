import type { CollectionConfig, CollectionAfterChangeHook } from 'payload'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import { readFile } from 'fs/promises'

import { envClient } from '../env/client'

// Helper to generate blur placeholder
async function generateBlurPlaceholder(docId: number, filename: string, _mimeType: string) {
  try {
    // Try to find the file in the media directory
    const mediaDir = path.resolve(process.cwd(), 'media')
    const filePath = path.join(mediaDir, filename)

    let imageBuffer: Buffer

    try {
      // Read directly from disk (most reliable)
      imageBuffer = await readFile(filePath)
    } catch (_diskError) {
      // Fallback: try to fetch via HTTP
      const serverUrl = envClient.NEXT_PUBLIC_SITE_URL
      const imageUrl = `${serverUrl}/api/media/file/${filename}`

      console.log(`Reading from disk failed, trying HTTP: ${imageUrl}`)
      const response = await fetch(imageUrl)
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`)
      }
      imageBuffer = Buffer.from(await response.arrayBuffer())
    }

    // Generate blur placeholder using sharp
    const { default: sharp } = await import('sharp')
    const blurBuffer = await sharp(imageBuffer)
      .resize(10, 10, { fit: 'inside' })
      .blur()
      .png({ quality: 20, compressionLevel: 9 })
      .toBuffer()

    const base64 = `data:image/png;base64,${blurBuffer.toString('base64')}`

    // Update the document with a fresh payload instance
    const payload = await getPayload({ config })
    await payload.update({
      collection: 'media',
      id: docId,
      data: { blurDataURL: base64 },
    })

    console.log(`✓ Blur placeholder generated for: ${filename}`)
  } catch (error) {
    console.error(`✗ Failed to generate blur for ${filename}:`, error)
  }
}

const generateBlurHook: CollectionAfterChangeHook = async ({ doc, operation }) => {
  // Skip if no filename, not an image, or already has blurDataURL
  if (!doc.filename || !doc.mimeType?.startsWith('image/') || doc.blurDataURL) {
    return doc
  }

  // Only process on create or if blurDataURL is missing on update
  if (operation === 'update' && doc.blurDataURL) {
    return doc
  }

  // Schedule blur generation after the current operation completes
  // This avoids blocking the response and prevents hook recursion issues
  setImmediate(() => {
    generateBlurPlaceholder(doc.id, doc.filename as string, doc.mimeType as string)
  })

  return doc
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ['image/*'],
    formatOptions: {
      format: 'webp',
      options: {
        quality: 80,
        effort: 4,
      },
    },
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 640,
        height: 480,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
  },
  hooks: {
    afterChange: [generateBlurHook],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
      admin: {
        description: 'Beschreibung des Bildes für Barrierefreiheit und SEO',
      },
    },
    {
      name: 'blurDataURL',
      type: 'text',
      label: 'Blur Placeholder',
      admin: {
        description: 'Base64-kodiertes Vorschaubild (automatisch generiert)',
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Bildunterschrift',
    },
  ],
}

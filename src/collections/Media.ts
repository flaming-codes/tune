import type { CollectionConfig } from 'payload'
import sharp from 'sharp'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    // Restrict to images only
    mimeTypes: ['image/*'],
    // Convert all uploads to WebP for optimal performance
    formatOptions: {
      format: 'webp',
      options: {
        quality: 80,
        effort: 4, // Compression effort (0-6)
      },
    },
    // Generate multiple image sizes for responsive images
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
        height: undefined, // Maintain aspect ratio
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: undefined,
        position: 'centre',
      },
    ],
    // Admin thumbnail display
    adminThumbnail: 'thumbnail',
  },
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        // Generate blur placeholder for images
        if (
          !doc.filename ||
          !doc.mimeType?.startsWith('image/') ||
          doc.blurDataURL
        ) {
          return doc
        }

        try {
          // Get the full URL for the uploaded image
          const fullUrl = doc.url?.startsWith('http')
            ? doc.url
            : `${process.env.NEXT_PUBLIC_SERVER_URL || ''}${doc.url}`

          if (!fullUrl) {
            req.payload.logger.warn(`Skipping blur generation for ${doc.filename} - no URL found`)
            return doc
          }

          // Fetch the image
          const response = await fetch(fullUrl)
          if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.status}`)
          }
          const imageBuffer = Buffer.from(await response.arrayBuffer())

          // Generate 10x10 blur placeholder using sharp
          const blurBuffer = await sharp(imageBuffer)
            .resize(10, 10, { fit: 'inside' })
            .blur()
            .png({ quality: 20, compressionLevel: 9 })
            .toBuffer()

          const base64 = `data:image/png;base64,${blurBuffer.toString('base64')}`

          // Update the document with blurDataURL using setTimeout to avoid recursion
          setTimeout(async () => {
            try {
              await req.payload.update({
                collection: 'media',
                id: doc.id,
                data: { blurDataURL: base64 },
                req,
              })
              req.payload.logger.info(`Blur placeholder generated for: ${doc.filename}`)
            } catch (error) {
              req.payload.logger.error(`Failed to save blur placeholder: ${error}`)
            }
          }, 100)
        } catch (error) {
          req.payload.logger.error(`Failed to generate blur placeholder: ${error}`)
        }

        return doc
      },
    ],
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

import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { TeamMembers } from './collections/TeamMembers'
import { GalleryImages } from './collections/GalleryImages'
import { Testimonials } from './collections/Testimonials'
import { StartPage } from './globals/StartPage'
import type { StartPage as StartPageType } from './payload-types'
import { seedStartPage } from './seed/startPage'
import { envClient } from './env/client'
import { envServer } from './env/server'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: envClient.NEXT_PUBLIC_SITE_URL,
    },
  },
  collections: [Users, Media, TeamMembers, GalleryImages, Testimonials],
  globals: [StartPage],
  editor: lexicalEditor(),
  secret: envServer.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: envServer.DATABASE_URL,
    },
    // Disable push mode - use explicit migrations instead
    push: false,
  }),
  sharp,
  plugins: [
    seoPlugin({
      globals: ['start-page'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) => doc?.meta?.title || 'Tierarztpraxis Dr. Tune Lazri | Wien',
      generateDescription: ({ doc }) =>
        doc?.meta?.description ||
        'Tierarztpraxis Dr. Tune Lazri in Wien. Hausbesuche, Vorsorge, Diagnostik, Operationen.',
    }),
  ],
  onInit: async (payload) => {
    if (envServer.PAYLOAD_SEED === 'true') {
      await seedStartPage(payload, envServer.PAYLOAD_SEED_OVERWRITE === 'true')
      payload.logger.info('Startseite wurde erfolgreich geseedet.')
    }
  },
})

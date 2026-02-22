import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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
import { seedStartPage } from './seed/startPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
  },
  collections: [Users, Media, TeamMembers, GalleryImages, Testimonials],
  globals: [StartPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || '',
    },
    // Disable push mode - use explicit migrations instead
    push: false,
  }),
  sharp,
  plugins: [],
  onInit: async (payload) => {
    if (process.env.PAYLOAD_SEED === 'true') {
      await seedStartPage(payload, process.env.PAYLOAD_SEED_OVERWRITE === 'true')
      payload.logger.info('Startseite wurde erfolgreich geseedet.')
    }
  },
})

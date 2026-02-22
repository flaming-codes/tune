import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { PrivacyAcknowledgments } from './collections/PrivacyAcknowledgments'
import { ScreensaverImages } from './collections/ScreensaverImages'
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
    dashboard: {
      // Define the default layout - network info widget first, then collections
      defaultLayout: ({ req: _req }) => [
        { widgetSlug: 'collections', width: 'full' },
        { widgetSlug: 'network-info', width: 'full' },
      ],
      widgets: [
        {
          slug: 'network-info',
          ComponentPath: '/components/NetworkInfoWidget#default',
          minWidth: 'medium',
          maxWidth: 'full',
        },
      ],
    },
    components: {
      views: {
        // Keep the Network Info view at /admin/network-info as a standalone page
        'network-info': {
          Component: '/components/LocalIpWidget',
          path: '/network-info',
        },
      },
    },
  },
  collections: [Users, PrivacyAcknowledgments, ScreensaverImages],
  editor: lexicalEditor(),
  secret: envServer.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: envServer.DATABASE_URL,
    },
    push: false,
  }),
  sharp,
  plugins: [],
})

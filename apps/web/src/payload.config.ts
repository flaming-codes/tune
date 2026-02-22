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
import { AnalyticsEvents } from './collections/AnalyticsEvents'
import { StartPage } from './globals/StartPage'
import { ImprintPage } from './globals/ImprintPage'
import { PrivacyPolicyPage } from './globals/PrivacyPolicyPage'
import { seedStartPage } from './seed/startPage'
import { seedLegalPages } from './seed/legal-pages'
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
    meta: {
      titleSuffix: '- Tune Lazri',
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/favicon-32x32.png',
        },
      ],
    },
    components: {
      graphics: {
        Logo: '/components/Logo#Logo',
      },
    },
    dashboard: {
      defaultLayout: ({ req: _req }) => [
        { widgetSlug: 'collections', width: 'full' },
        { widgetSlug: 'analytics-section-title', width: 'full' },
        { widgetSlug: 'analytics-events-total', width: 'medium' },
        { widgetSlug: 'analytics-page-views', width: 'medium' },
        { widgetSlug: 'analytics-track-events', width: 'medium' },
        { widgetSlug: 'analytics-top-pages', width: 'full' },
      ],
      widgets: [
        {
          slug: 'analytics-section-title',
          ComponentPath: '/components/AnalyticsWidgets/AnalyticsSectionTitleWidget#default',
          minWidth: 'full',
          maxWidth: 'full',
        },
        {
          slug: 'analytics-events-total',
          ComponentPath: '/components/AnalyticsWidgets/AllEventsWidget#default',
          minWidth: 'small',
          maxWidth: 'full',
        },
        {
          slug: 'analytics-page-views',
          ComponentPath: '/components/AnalyticsWidgets/PageViewsWidget#default',
          minWidth: 'small',
          maxWidth: 'full',
        },
        {
          slug: 'analytics-track-events',
          ComponentPath: '/components/AnalyticsWidgets/TrackEventsWidget#default',
          minWidth: 'small',
          maxWidth: 'full',
        },
        {
          slug: 'analytics-top-pages',
          ComponentPath: '/components/AnalyticsWidgets/TopPagesWidget#default',
          minWidth: 'medium',
          maxWidth: 'full',
        },
      ],
    },
  },
  collections: [Users, Media, TeamMembers, GalleryImages, Testimonials, AnalyticsEvents],
  globals: [StartPage, ImprintPage, PrivacyPolicyPage],
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
  onInit: async (payload) => {
    if (envServer.PAYLOAD_SEED === 'true') {
      await seedStartPage(payload, envServer.PAYLOAD_SEED_OVERWRITE === 'true')
      await seedLegalPages(payload, envServer.PAYLOAD_SEED_OVERWRITE === 'true')
      payload.logger.info('Startseite und Rechtstexte wurden erfolgreich geseedet.')
    }
  },
})

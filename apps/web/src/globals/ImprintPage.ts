import type { GlobalConfig } from 'payload'

import { createGlobalVersions } from '@/lib/versioning'
import { createJsonLdField } from './jsonLdFields'
import { createSeoField } from './seoFields'

export const ImprintPage: GlobalConfig = {
  slug: 'imprint-page',
  label: 'Impressum',
  admin: {
    group: 'Seiten',
    description: 'Autorenansicht für die Impressum-Seite.',
    preview: () => '/impressum',
    livePreview: {
      url: () => '/impressum',
    },
  },
  access: {
    read: () => true,
  },
  versions: createGlobalVersions(),
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Inhalt',
          fields: [
            {
              name: 'pageTitle',
              type: 'text',
              required: true,
              label: 'Seitentitel',
            },
            {
              name: 'content',
              type: 'richText',
              required: true,
              label: 'Inhalt',
            },
          ],
        },
        {
          label: 'SEO',
          fields: [createSeoField()],
        },
        {
          label: 'JSON+LD',
          fields: [
            createJsonLdField({
              defaultPageType: 'AboutPage',
            }),
          ],
        },
      ],
    },
  ],
}

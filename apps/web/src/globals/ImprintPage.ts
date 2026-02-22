import type { GlobalConfig } from 'payload'

import { createGlobalVersions } from '@/lib/versioning'

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
      name: 'pageTitle',
      type: 'text',
      required: true,
      defaultValue: 'Impressum',
      label: 'Seitentitel',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Inhalt',
    },
  ],
}

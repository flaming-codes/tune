import type { GlobalConfig } from 'payload'

import { createGlobalVersions } from '@/lib/versioning'

export const PrivacyPolicyPage: GlobalConfig = {
  slug: 'privacy-policy-page',
  label: 'Datenschutzerklärung',
  admin: {
    group: 'Seiten',
    description: 'Autorenansicht für die Datenschutzerklärung.',
    preview: () => '/datenschutzerklarung',
    livePreview: {
      url: () => '/datenschutzerklarung',
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
      defaultValue: 'Datenschutzerklärung',
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

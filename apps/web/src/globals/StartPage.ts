import type { GlobalConfig } from 'payload'

import {
  startPageFooterBlocks,
  startPageHeaderBlocks,
  startPageLayoutBlocks,
} from '@/blocks/startPage'
import { createGlobalVersions } from '@/lib/versioning'
import { createJsonLdField } from './jsonLdFields'
import { createSeoField } from './seoFields'

export const StartPage: GlobalConfig = {
  slug: 'start-page',
  label: 'Startseite',
  admin: {
    group: 'Seiten',
    description: 'Autorenansicht für die Startseite mit frei sortierbaren Inhaltsblöcken.',
    preview: () => '/',
    livePreview: {
      url: () => '/',
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
              name: 'header',
              type: 'blocks',
              label: 'Header',
              minRows: 1,
              maxRows: 1,
              blocks: startPageHeaderBlocks,
            },
            {
              name: 'layout',
              type: 'blocks',
              label: 'Seiteninhalt',
              minRows: 1,
              blocks: startPageLayoutBlocks,
            },
            {
              name: 'footer',
              type: 'blocks',
              label: 'Footer',
              minRows: 1,
              maxRows: 1,
              blocks: startPageFooterBlocks,
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
              defaultPageType: 'WebPage',
              includeTeamMembers: true,
            }),
          ],
        },
      ],
    },
  ],
}

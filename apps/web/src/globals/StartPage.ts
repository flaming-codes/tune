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
              defaultValue: [{ blockType: 'navigation' }],
            },
            {
              name: 'layout',
              type: 'blocks',
              label: 'Seiteninhalt',
              minRows: 1,
              blocks: startPageLayoutBlocks,
              defaultValue: [
                { blockType: 'hero' },
                { blockType: 'services' },
                { blockType: 'quote' },
                { blockType: 'testimonials' },
                { blockType: 'gallery' },
                { blockType: 'team' },
                { blockType: 'hours' },
                { blockType: 'contact' },
                { blockType: 'contactForm' },
              ],
            },
            {
              name: 'footer',
              type: 'blocks',
              label: 'Footer',
              minRows: 1,
              maxRows: 1,
              blocks: startPageFooterBlocks,
              defaultValue: [{ blockType: 'footer' }],
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

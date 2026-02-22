import type { GlobalConfig } from 'payload'

import {
  startPageFooterBlocks,
  startPageHeaderBlocks,
  startPageLayoutBlocks,
} from '@/blocks/startPage'

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
}

import type { CollectionBeforeValidateHook, CollectionConfig } from 'payload'

import { teamMemberPageLayoutBlocks } from '@/blocks/teamMemberPage'

function createSlug(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const setSlugFromNameHook: CollectionBeforeValidateHook = ({ data }) => {
  if (!data || typeof data !== 'object') return data

  const nextData = data as Record<string, unknown>
  const slug = typeof nextData.slug === 'string' ? nextData.slug.trim() : ''
  const name = typeof nextData.name === 'string' ? nextData.name.trim() : ''

  if (slug || !name) {
    return data
  }

  const generatedSlug = createSlug(name)
  if (!generatedSlug) {
    return data
  }

  return {
    ...nextData,
    slug: generatedSlug,
  }
}

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'role', 'sortOrder', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [setSlugFromNameHook],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: false,
      unique: true,
      index: true,
      label: 'URL Slug',
      admin: {
        description: 'Wird für die Team-Seite verwendet, z. B. max-mustermann',
      },
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      label: 'Rolle / Position',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Beschreibung',
    },
    {
      name: 'photos',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      required: true,
      minRows: 1,
      label: 'Fotos',
      admin: {
        description:
          'Mehrere Fotos hochladen. Das erste Foto wird standardmäßig angezeigt. Bei Hover werden die Fotos basierend auf Cursor-Bewegung gewechselt.',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      label: 'Sortierreihenfolge',
      admin: {
        description: 'Niedrigere Zahlen werden zuerst angezeigt',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Aktiv',
      admin: {
        description: 'Nur aktive Teammitglieder werden auf der Website angezeigt',
      },
    },
    {
      name: 'memberPageLayout',
      type: 'blocks',
      label: 'Team-Seiteninhalt',
      minRows: 1,
      blocks: teamMemberPageLayoutBlocks,
      defaultValue: [{ blockType: 'memberHero' }, { blockType: 'memberCv' }],
      admin: {
        description:
          'Inhalt für /team/{slug}. Neben team-spezifischen Blöcken können auch bestehende Startseiten-Blöcke wiederverwendet werden.',
      },
    },
  ],
}

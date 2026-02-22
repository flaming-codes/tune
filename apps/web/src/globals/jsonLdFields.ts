import type { Field } from 'payload'

type JsonLdPageType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage'

interface JsonLdFieldsOptions {
  defaultPageType?: JsonLdPageType
  includeTeamMembers?: boolean
}

export function createJsonLdField({
  defaultPageType = 'WebPage',
  includeTeamMembers = false,
}: JsonLdFieldsOptions = {}): Field {
  const fields: Field[] = [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Aktiviert',
      defaultValue: true,
    },
    {
      name: 'pageType',
      type: 'select',
      label: 'Seitentyp',
      required: true,
      defaultValue: defaultPageType,
      options: [
        { label: 'WebPage', value: 'WebPage' },
        { label: 'AboutPage', value: 'AboutPage' },
        { label: 'ContactPage', value: 'ContactPage' },
        { label: 'CollectionPage', value: 'CollectionPage' },
      ],
    },
    {
      name: 'includeOrganization',
      type: 'checkbox',
      label: 'Organization einbetten',
      defaultValue: true,
    },
    {
      name: 'customSchemas',
      type: 'json',
      label: 'Zusätzliche JSON+LD-Schemata',
      admin: {
        description:
          'Optional: zusätzliches Schema als Objekt oder Array. Wird unverändert als JSON+LD ausgegeben.',
      },
    },
  ]

  if (includeTeamMembers) {
    fields.splice(3, 0, {
      name: 'teamMembers',
      type: 'relationship',
      relationTo: 'team-members',
      hasMany: true,
      label: 'Teammitglieder für Person-Schema (optional)',
      admin: {
        description:
          'Leer lassen, um automatisch alle aktiven Teammitglieder zu verwenden. Bei Auswahl werden nur diese verwendet.',
      },
    })
  }

  return {
    name: 'jsonLd',
    type: 'group',
    label: 'JSON+LD',
    fields,
  }
}

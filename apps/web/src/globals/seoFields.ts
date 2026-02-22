import type { Field } from 'payload'

const SEO_TITLE_RANGE = {
  min: 30,
  max: 60,
}

const SEO_DESCRIPTION_RANGE = {
  min: 120,
  max: 155,
}

function createLengthDescription(min: number, max: number): string {
  return `Empfohlen für Suchmaschinen: ${min}–${max} Zeichen.`
}

function validateOptimalLength(value: string | null | undefined, min: number, max: number) {
  if (!value) return true

  const trimmedValue = value.trim()
  if (!trimmedValue) return true

  const length = trimmedValue.length
  if (length < min || length > max) {
    return `Optimal sind ${min}–${max} Zeichen (aktuell: ${length}).`
  }

  return true
}

function validateCanonicalUrl(value: string | null | undefined) {
  if (!value) return true

  try {
    const url = new URL(value)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return 'Bitte eine absolute URL mit http:// oder https:// verwenden.'
    }
    return true
  } catch {
    return 'Bitte eine gültige absolute URL angeben.'
  }
}

export function createSeoField(): Field {
  return {
    name: 'meta',
    type: 'group',
    label: 'SEO',
    admin: {
      description: 'SEO-Einstellungen für Suchmaschinen und Social Preview.',
    },
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Meta-Titel',
        maxLength: SEO_TITLE_RANGE.max,
        admin: {
          description: createLengthDescription(SEO_TITLE_RANGE.min, SEO_TITLE_RANGE.max),
        },
        validate: (value: unknown) =>
          validateOptimalLength(
            value as string | null | undefined,
            SEO_TITLE_RANGE.min,
            SEO_TITLE_RANGE.max,
          ),
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Meta-Beschreibung',
        maxLength: SEO_DESCRIPTION_RANGE.max,
        admin: {
          description: createLengthDescription(
            SEO_DESCRIPTION_RANGE.min,
            SEO_DESCRIPTION_RANGE.max,
          ),
        },
        validate: (value: unknown) =>
          validateOptimalLength(
            value as string | null | undefined,
            SEO_DESCRIPTION_RANGE.min,
            SEO_DESCRIPTION_RANGE.max,
          ),
      },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'Social-Vorschaubild',
      },
      {
        name: 'canonicalUrl',
        type: 'text',
        label: 'Canonical URL (optional)',
        admin: {
          description: 'Absolute URL, z. B. https://www.deine-domain.at/impressum',
        },
        validate: (value: unknown) => validateCanonicalUrl(value as string | null | undefined),
      },
      {
        name: 'noIndex',
        type: 'checkbox',
        label: 'Suchmaschinen-Indexierung verhindern (noindex)',
        defaultValue: false,
      },
    ],
  }
}

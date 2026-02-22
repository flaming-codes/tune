import type {
  ImprintPage,
  PrivacyPolicyPage,
  StartPage,
  TeamMember,
  Testimonial,
} from '@/payload-types'
import { envClient } from '@/env/client'

type StartPageBlock = NonNullable<StartPage['layout']>[number]
type StartPageHeaderBlock = NonNullable<StartPage['header']>[number]

type JsonObject = Record<string, unknown>

const SCHEMA_CONTEXT = 'https://schema.org'

function toAbsoluteUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `${envClient.NEXT_PUBLIC_SITE_URL}${url.startsWith('/') ? url : `/${url}`}`
}

function findHeaderBlock<TType extends StartPageHeaderBlock['blockType']>(
  blocks: StartPage['header'] | undefined | null,
  blockType: TType,
): Extract<StartPageHeaderBlock, { blockType: TType }> | null {
  if (!Array.isArray(blocks)) return null
  return (
    blocks.find(
      (block): block is Extract<StartPageHeaderBlock, { blockType: TType }> =>
        block.blockType === blockType,
    ) || null
  )
}

function findLayoutBlock<TType extends StartPageBlock['blockType']>(
  blocks: StartPage['layout'] | undefined | null,
  blockType: TType,
): Extract<StartPageBlock, { blockType: TType }> | null {
  if (!Array.isArray(blocks)) return null
  return (
    blocks.find(
      (block): block is Extract<StartPageBlock, { blockType: TType }> =>
        block.blockType === blockType,
    ) || null
  )
}

function mapDayToSchema(day: string): string | null {
  const normalized = day.trim().toLowerCase()
  if (normalized === 'montag') return 'Monday'
  if (normalized === 'dienstag') return 'Tuesday'
  if (normalized === 'mittwoch') return 'Wednesday'
  if (normalized === 'donnerstag') return 'Thursday'
  if (normalized === 'freitag') return 'Friday'
  if (normalized === 'samstag') return 'Saturday'
  if (normalized === 'sonntag') return 'Sunday'
  return null
}

function parseOpenCloseRanges(times: string): Array<{ opens: string; closes: string }> {
  const normalized = times.replace(/–/g, '-').replace(/\s+/g, ' ')
  const matches = normalized.matchAll(/(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})/g)
  return [...matches].map((match) => ({
    opens: match[1],
    closes: match[2],
  }))
}

function asArrayOfObjects(input: unknown): JsonObject[] {
  if (!input) return []
  if (Array.isArray(input)) {
    return input.filter((item): item is JsonObject => typeof item === 'object' && item !== null)
  }
  if (typeof input === 'object' && input !== null) {
    return [input as JsonObject]
  }
  return []
}

function resolveTeamMembers(
  preferredMembers:
    | (StartPage['jsonLd'] extends { teamMembers?: infer T } ? T : unknown)
    | undefined,
  allTeamMembers: TeamMember[],
): TeamMember[] {
  if (!Array.isArray(preferredMembers) || preferredMembers.length === 0) return allTeamMembers

  const preferredIds = new Set(
    preferredMembers
      .map((entry) => (typeof entry === 'number' ? entry : entry?.id))
      .filter((value): value is number => typeof value === 'number'),
  )

  if (preferredIds.size === 0) return allTeamMembers
  return allTeamMembers.filter((member) => preferredIds.has(member.id))
}

function getPageSchema(
  pageType: StartPage['jsonLd'] extends { pageType?: infer T } ? T : string,
  pageUrl: string,
  name: string,
  description: string | null | undefined,
): JsonObject {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': pageType || 'WebPage',
    name,
    url: pageUrl,
    description: description || undefined,
    inLanguage: 'de-AT',
  }
}

function getOrganizationSchema(
  args: {
    name: string
    url: string
    telephone?: string | null
    email?: string | null
    street?: string | null
    city?: string | null
    logoUrl?: string | null
  },
  members: TeamMember[],
): JsonObject {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'Organization',
    name: args.name,
    url: args.url,
    logo: args.logoUrl || undefined,
    telephone: args.telephone || undefined,
    email: args.email || undefined,
    address:
      args.street || args.city
        ? {
            '@type': 'PostalAddress',
            streetAddress: args.street || undefined,
            addressLocality: args.city || undefined,
            addressCountry: 'AT',
          }
        : undefined,
    employee: members.map((member) => ({
      '@type': 'Person',
      name: member.name,
      jobTitle: member.role,
    })),
  }
}

export function buildStartPageJsonLd({
  startPage,
  teamMembers,
  testimonials,
}: {
  startPage: StartPage
  teamMembers: TeamMember[]
  testimonials: Testimonial[]
}): JsonObject[] {
  if (startPage.jsonLd?.enabled === false) return []

  const navBlock = findHeaderBlock(startPage.header, 'navigation')
  const contactBlock = findLayoutBlock(startPage.layout, 'contact')
  const hoursBlock = findLayoutBlock(startPage.layout, 'hours')
  const heroBlock = findLayoutBlock(startPage.layout, 'hero')

  const practiceName = navBlock?.practiceName || 'Tierarztpraxis'
  const pageUrl = envClient.NEXT_PUBLIC_SITE_URL
  const selectedMembers = resolveTeamMembers(startPage.jsonLd?.teamMembers, teamMembers)

  const openingHoursSpecification = (hoursBlock?.openingHours || []).flatMap((item) => {
    if (item.state !== 'open') return []
    const day = mapDayToSchema(item.day)
    if (!day) return []

    return parseOpenCloseRanges(item.times).map((range) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: day,
      opens: range.opens,
      closes: range.closes,
    }))
  })

  const activeReviews = testimonials
    .filter((item) => typeof item.rating === 'number' && item.rating > 0)
    .slice(0, 10)

  const review = activeReviews.map((item) => ({
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: item.author,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: item.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: item.text,
    datePublished: item.reviewDate || undefined,
  }))

  const aggregateRating =
    activeReviews.length > 0
      ? {
          '@type': 'AggregateRating',
          ratingValue:
            Math.round(
              (activeReviews.reduce((sum, item) => sum + (item.rating || 0), 0) /
                activeReviews.length) *
                10,
            ) / 10,
          reviewCount: activeReviews.length,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined

  const jsonLd: JsonObject[] = [
    getPageSchema(
      startPage.jsonLd?.pageType,
      pageUrl,
      startPage.meta?.title || practiceName,
      startPage.meta?.description,
    ),
    {
      '@context': SCHEMA_CONTEXT,
      '@type': 'VeterinaryCare',
      name: practiceName,
      url: pageUrl,
      image: toAbsoluteUrl(
        heroBlock?.heroImage && typeof heroBlock.heroImage !== 'number'
          ? heroBlock.heroImage.url
          : null,
      ),
      telephone: navBlock?.phone || contactBlock?.phone || undefined,
      email: contactBlock?.email || undefined,
      description: startPage.meta?.description || heroBlock?.description || undefined,
      address: {
        '@type': 'PostalAddress',
        streetAddress: contactBlock?.address.street || undefined,
        addressLocality: contactBlock?.address.city || undefined,
        addressCountry: 'AT',
      },
      openingHoursSpecification,
      review,
      aggregateRating,
    },
  ]

  if (startPage.jsonLd?.includeOrganization !== false) {
    jsonLd.push(
      getOrganizationSchema(
        {
          name: practiceName,
          url: pageUrl,
          telephone: navBlock?.phone || contactBlock?.phone,
          email: contactBlock?.email,
          street: contactBlock?.address.street,
          city: contactBlock?.address.city,
          logoUrl: toAbsoluteUrl(
            startPage.meta?.image && typeof startPage.meta.image !== 'number'
              ? startPage.meta.image.url
              : null,
          ),
        },
        selectedMembers,
      ),
    )
  }

  const personSchemas = selectedMembers.map((member) => ({
    '@context': SCHEMA_CONTEXT,
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role,
    description: member.description,
    image: toAbsoluteUrl(
      Array.isArray(member.photos) && member.photos[0] && typeof member.photos[0] !== 'number'
        ? member.photos[0].url
        : null,
    ),
  }))

  return [...jsonLd, ...personSchemas, ...asArrayOfObjects(startPage.jsonLd?.customSchemas)]
}

export function buildImprintPageJsonLd({
  imprintPage,
  practiceName,
  phone,
  email,
}: {
  imprintPage: ImprintPage
  practiceName: string
  phone: string
  email: string
}): JsonObject[] {
  if (imprintPage.jsonLd?.enabled === false) return []

  const pageUrl = `${envClient.NEXT_PUBLIC_SITE_URL}/impressum`
  const jsonLd: JsonObject[] = [
    getPageSchema(
      imprintPage.jsonLd?.pageType,
      pageUrl,
      imprintPage.meta?.title || imprintPage.pageTitle || 'Impressum',
      imprintPage.meta?.description,
    ),
  ]

  if (imprintPage.jsonLd?.includeOrganization !== false) {
    jsonLd.push(
      getOrganizationSchema(
        {
          name: practiceName,
          url: envClient.NEXT_PUBLIC_SITE_URL,
          telephone: phone,
          email,
        },
        [],
      ),
    )
  }

  return [...jsonLd, ...asArrayOfObjects(imprintPage.jsonLd?.customSchemas)]
}

export function buildPrivacyPolicyPageJsonLd({
  privacyPolicyPage,
  practiceName,
  phone,
  email,
}: {
  privacyPolicyPage: PrivacyPolicyPage
  practiceName: string
  phone: string
  email: string
}): JsonObject[] {
  if (privacyPolicyPage.jsonLd?.enabled === false) return []

  const pageUrl = `${envClient.NEXT_PUBLIC_SITE_URL}/datenschutzerklarung`
  const jsonLd: JsonObject[] = [
    getPageSchema(
      privacyPolicyPage.jsonLd?.pageType,
      pageUrl,
      privacyPolicyPage.meta?.title || privacyPolicyPage.pageTitle || 'Datenschutzerklärung',
      privacyPolicyPage.meta?.description,
    ),
  ]

  if (privacyPolicyPage.jsonLd?.includeOrganization !== false) {
    jsonLd.push(
      getOrganizationSchema(
        {
          name: practiceName,
          url: envClient.NEXT_PUBLIC_SITE_URL,
          telephone: phone,
          email,
        },
        [],
      ),
    )
  }

  return [...jsonLd, ...asArrayOfObjects(privacyPolicyPage.jsonLd?.customSchemas)]
}

interface Address {
  street: string
  city: string
}

export interface LegalLink {
  label: string
  href: string
}

export const LEGAL_LINKS: LegalLink[] = [
  { label: 'Impressum', href: '/impressum' },
  { label: 'Datenschutzerklärung', href: '/datenschutzerklarung' },
]

/**
 * Generate Google Maps directions URL for the practice address
 */
export function getGoogleMapsDirectionsUrl(address: Address): string {
  const fullAddress = `${address.street}, ${address.city}`
  return `https://maps.google.com/maps/dir//${encodeURIComponent(fullAddress)}`
}

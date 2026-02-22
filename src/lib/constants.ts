import type { SiteSetting } from '@/payload-types'

/**
 * Generate Google Maps directions URL for the practice address
 */
export function getGoogleMapsDirectionsUrl(
  address: SiteSetting['contact']['address']
): string {
  const fullAddress = `${address.street}, ${address.city}`
  return `https://maps.google.com/maps/dir//${encodeURIComponent(fullAddress)}`
}

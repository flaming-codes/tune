interface Address {
  street: string
  city: string
}

/**
 * Generate Google Maps directions URL for the practice address
 */
export function getGoogleMapsDirectionsUrl(address: Address): string {
  const fullAddress = `${address.street}, ${address.city}`
  return `https://maps.google.com/maps/dir//${encodeURIComponent(fullAddress)}`
}

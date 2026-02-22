import { networkInterfaces } from 'os'

/**
 * Get the local IPv4 address of the machine.
 * Iterates through network interfaces and returns the first
 * non-internal IPv4 address found.
 *
 * @returns The local IP address (e.g., "192.168.0.134") or undefined if not found
 */
export function getLocalIpAddress(): string | undefined {
  const nets = networkInterfaces()

  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      // Skip internal (localhost) and non-IPv4 addresses
      if (net.family === 'IPv4' && !net.internal) {
        return net.address
      }
    }
  }
  return undefined
}

/**
 * Get all local IPv4 addresses of the machine.
 * Useful when the machine has multiple network interfaces.
 *
 * @returns Array of local IP addresses
 */
export function getAllLocalIpAddresses(): string[] {
  const nets = networkInterfaces()
  const addresses: string[] = []

  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      // Skip internal (localhost) and non-IPv4 addresses
      if (net.family === 'IPv4' && !net.internal) {
        addresses.push(net.address)
      }
    }
  }
  return addresses
}

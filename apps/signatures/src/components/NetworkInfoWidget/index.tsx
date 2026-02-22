import type { WidgetServerProps } from 'payload'
import { getLocalIpAddress, getAllLocalIpAddresses } from '@/lib/getLocalIp'
import NetworkInfoClient from './NetworkInfoClient'

/**
 * NetworkInfoWidget - Payload Dashboard Widget (Server Component)
 *
 * Fetches server network information and passes it to the client
 * component for rendering with @payloadcms/ui components.
 */
export default async function NetworkInfoWidget({ req: _req }: WidgetServerProps) {
  const primaryIp = getLocalIpAddress()
  const allIps = getAllLocalIpAddresses()

  const cmsUrl = primaryIp ? `http://${primaryIp}:3001/admin` : undefined
  const formUrl = primaryIp ? `http://${primaryIp}:3001` : undefined

  return (
    <NetworkInfoClient allIps={allIps} cmsUrl={cmsUrl} formUrl={formUrl} primaryIp={primaryIp} />
  )
}

import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack is now the default bundler in Next.js 16
  // No custom webpack configuration needed
}

export default withPayload(nextConfig, { devBundleServerPackages: false })

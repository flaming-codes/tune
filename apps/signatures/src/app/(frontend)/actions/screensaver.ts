'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import type { ScreensaverImage } from '@/payload-types'

export interface ScreensaverImagesResult {
  images: ScreensaverImage[]
  error?: string
}

/**
 * Fetch active screensaver images ordered by display order.
 */
export async function getScreensaverImages(): Promise<ScreensaverImagesResult> {
  try {
    const payload = await getPayload({ config })

    const { docs } = await payload.find({
      collection: 'screensaver-images',
      where: {
        active: {
          equals: true,
        },
      },
      sort: 'displayOrder',
    })

    return { images: docs as ScreensaverImage[] }
  } catch {
    return { images: [], error: 'Failed to load screensaver images' }
  }
}

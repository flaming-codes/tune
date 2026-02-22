'use client'

import { useCallback, useEffect, useState } from 'react'
import { PrivacyForm } from './PrivacyForm'
import { Screensaver } from './Screensaver'
import { useIdleTimeout } from '../hooks/useIdleTimeout'
import { getScreensaverImages } from '../actions/screensaver'
import { envClient } from '@/env/client'
import type { ScreensaverImage } from '@/payload-types'

// Convert seconds to milliseconds
const SCREENSAVER_TIMEOUT_MS = envClient.NEXT_PUBLIC_SCREENSAVER_TIMEOUT_SECONDS * 1000

/**
 * Wrapper component that adds screensaver functionality to the PrivacyForm.
 * Shows a parallax marquee screensaver after inactivity (configurable via env var).
 */
export function PrivacyFormScreensaver() {
  const [images, setImages] = useState<ScreensaverImage[]>([])
  const [screensaverActive, setScreensaverActive] = useState(false)

  // Fetch screensaver images on mount
  useEffect(() => {
    const loadImages = async () => {
      const { images } = await getScreensaverImages()
      setImages(images)
    }
    loadImages()
  }, [])

  const handleIdle = useCallback(() => {
    if (images.length > 0) {
      setScreensaverActive(true)
    }
  }, [images.length])

  const handleActive = useCallback(() => {
    setScreensaverActive(false)
  }, [])

  const { resetIdleTimer } = useIdleTimeout({
    timeoutMs: SCREENSAVER_TIMEOUT_MS,
    onIdle: handleIdle,
    onActive: handleActive,
    enabled: true,
  })

  return (
    <>
      <PrivacyForm onActivity={resetIdleTimer} />
      <Screensaver
        images={images}
        isActive={screensaverActive}
        onInteraction={resetIdleTimer}
      />
    </>
  )
}

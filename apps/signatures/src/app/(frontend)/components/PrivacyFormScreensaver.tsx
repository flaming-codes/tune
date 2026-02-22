'use client'

import { useCallback, useState } from 'react'
import { PrivacyForm } from './PrivacyForm'
import { Screensaver } from './Screensaver'
import { useIdleTimeout } from '../hooks/useIdleTimeout'
import { envClient } from '@/env/client'

// Convert seconds to milliseconds
const SCREENSAVER_TIMEOUT_MS = envClient.NEXT_PUBLIC_SCREENSAVER_TIMEOUT_SECONDS * 1000

/**
 * Wrapper component that adds screensaver functionality to the PrivacyForm.
 * Shows a simplified screensaver after inactivity (configurable via env var).
 */
export function PrivacyFormScreensaver() {
  const [screensaverActive, setScreensaverActive] = useState(false)

  const handleIdle = useCallback(() => {
    setScreensaverActive(true)
  }, [])

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
      <Screensaver isActive={screensaverActive} onInteraction={resetIdleTimer} />
    </>
  )
}

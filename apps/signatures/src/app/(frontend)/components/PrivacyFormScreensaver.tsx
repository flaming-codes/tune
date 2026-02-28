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
 * When idle, the form is fully remounted to reset all state (step, fields, signature).
 */
export function PrivacyFormScreensaver() {
  const [screensaverActive, setScreensaverActive] = useState(false)
  const [formKey, setFormKey] = useState(0)

  const handleIdle = useCallback(() => {
    setScreensaverActive(true)
    // Increment key to remount PrivacyForm with fresh state when screensaver shows
    setFormKey((prev) => prev + 1)
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
      <PrivacyForm key={formKey} onActivity={resetIdleTimer} />
      <Screensaver isActive={screensaverActive} onInteraction={resetIdleTimer} />
    </>
  )
}

'use client'

import { useEffect, useRef, useCallback, useState } from 'react'

export interface UseWakeLockOptions {
  /** Whether the wake lock should be active */
  enabled?: boolean
  /** Callback when wake lock is acquired */
  onAcquire?: () => void
  /** Callback when wake lock is released */
  onRelease?: () => void
  /** Callback when wake lock fails to acquire */
  onError?: (error: Error) => void
}

/**
 * React hook for the Screen Wake Lock API.
 * Prevents the device display from dimming or locking while active.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API
 */
export function useWakeLock(options: UseWakeLockOptions = {}) {
  const { enabled = true, onAcquire, onRelease, onError } = options
  const wakeLockRef = useRef<WakeLockSentinel | null>(null)
  const [isActive, setIsActive] = useState(false)

  /* eslint-disable react-hooks/set-state-in-effect */
  const releaseWakeLock = useCallback(async () => {
    if (wakeLockRef.current) {
      try {
        await wakeLockRef.current.release()
      } catch {
        // Ignore release errors
      }
      wakeLockRef.current = null
      setIsActive(false)
    }
  }, [])

  const requestWakeLock = useCallback(async () => {
    if (!enabled || typeof navigator === 'undefined' || !('wakeLock' in navigator)) {
      return
    }

    try {
      // Release any existing wake lock first
      await releaseWakeLock()

      const wakeLock = await navigator.wakeLock.request('screen')
      wakeLockRef.current = wakeLock
      setIsActive(true)

      wakeLock.addEventListener('release', () => {
        wakeLockRef.current = null
        setIsActive(false)
        onRelease?.()
      })

      onAcquire?.()
    } catch (error) {
      // Wake lock request failed (e.g., tab not active, permission denied)
      setIsActive(false)
      onError?.(error instanceof Error ? error : new Error(String(error)))
    }
  }, [enabled, onAcquire, onRelease, onError, releaseWakeLock])

  useEffect(() => {
    if (!enabled) {
      releaseWakeLock()
      return
    }

    // Request wake lock immediately if enabled
    requestWakeLock()

    // Re-acquire wake lock when page becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        requestWakeLock()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      releaseWakeLock()
    }
  }, [enabled, requestWakeLock, releaseWakeLock])
  /* eslint-enable react-hooks/set-state-in-effect */

  return {
    /** Whether wake lock is currently active */
    isActive,
    /** Manually request wake lock */
    request: requestWakeLock,
    /** Manually release wake lock */
    release: releaseWakeLock,
  }
}

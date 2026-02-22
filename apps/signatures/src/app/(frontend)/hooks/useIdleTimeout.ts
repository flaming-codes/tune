'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseIdleTimeoutOptions {
  /** Timeout in milliseconds before idle state is triggered */
  timeoutMs: number
  /** Callback when idle state is entered */
  onIdle?: () => void
  /** Callback when idle state is exited (user activity detected) */
  onActive?: () => void
  /** Whether the idle detection is enabled */
  enabled?: boolean
  /** Events to listen for user activity */
  events?: string[]
}

/**
 * React hook for detecting user inactivity.
 * Triggers callbacks when user becomes idle or active.
 *
 * @see useWakeLock - Can be combined to prevent screen sleep during active use
 */
export function useIdleTimeout(options: UseIdleTimeoutOptions) {
  const {
    timeoutMs,
    onIdle,
    onActive,
    enabled = true,
    events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'],
  } = options

  const [isIdle, setIsIdle] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isIdleRef = useRef(false)

  const clearIdleTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const setIdle = useCallback(() => {
    if (!isIdleRef.current) {
      isIdleRef.current = true
      setIsIdle(true)
      onIdle?.()
    }
  }, [onIdle])

  const resetIdleTimer = useCallback(() => {
    clearIdleTimeout()

    if (isIdleRef.current) {
      isIdleRef.current = false
      setIsIdle(false)
      onActive?.()
    }

    if (enabled) {
      timeoutRef.current = setTimeout(setIdle, timeoutMs)
    }
  }, [clearIdleTimeout, enabled, onActive, setIdle, timeoutMs])

  useEffect(() => {
    if (!enabled) {
      clearIdleTimeout()
      return
    }

    // Start the timer
    timeoutRef.current = setTimeout(setIdle, timeoutMs)

    // Add event listeners
    const handleActivity = () => {
      resetIdleTimer()
    }

    events.forEach((event) => {
      document.addEventListener(event, handleActivity)
    })

    return () => {
      clearIdleTimeout()
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity)
      })
    }
  }, [enabled, events, timeoutMs, clearIdleTimeout, setIdle, resetIdleTimer])

  return {
    isIdle,
    resetIdleTimer,
  }
}

'use client'

import React, { useRef, useCallback, useEffect, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { clsx } from 'clsx'

interface SignaturePadProps {
  value?: string
  onChange: (dataUrl: string) => void
  error?: string
  disabled?: boolean
}

export function SignaturePad({ value, onChange, error, disabled }: SignaturePadProps) {
  const canvasRef = useRef<SignatureCanvas>(null)
  const [canvasBackground, setCanvasBackground] = useState('rgb(255, 255, 255)')
  const [penColor, setPenColor] = useState('rgb(0, 0, 0)')

  useEffect(() => {
    const updateThemeColors = () => {
      const styles = getComputedStyle(document.documentElement)
      const bg = styles.getPropertyValue('--bg-secondary').trim()
      const text = styles.getPropertyValue('--text-primary').trim()

      setCanvasBackground(bg || 'rgb(255, 255, 255)')
      setPenColor(text || 'rgb(0, 0, 0)')
    }

    updateThemeColors()

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const observer = new MutationObserver(updateThemeColors)

    mediaQuery.addEventListener('change', updateThemeColors)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => {
      mediaQuery.removeEventListener('change', updateThemeColors)
      observer.disconnect()
    }
  }, [])

  const handleClear = useCallback(() => {
    if (canvasRef.current) {
      canvasRef.current.clear()
      onChange('')
    }
  }, [onChange])

  const handleEnd = useCallback(() => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL('image/png')
      onChange(dataUrl)
    }
  }, [onChange])

  return (
    <div className={clsx('space-y-3', disabled && 'opacity-50 pointer-events-none')}>
      <div
        className={clsx(
          'relative border theme-bg-secondary transition-colors',
          error ? 'border-red-300' : 'theme-border-primary',
        )}
      >
        <SignatureCanvas
          ref={canvasRef}
          canvasProps={{
            className: 'block w-full h-40 cursor-crosshair touch-none',
            'aria-label': 'Unterschrift',
          }}
          onEnd={handleEnd}
          backgroundColor={canvasBackground}
          penColor={penColor}
        />

        {/* Hint text */}
        {!value && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="theme-text-tertiary text-sm tracking-wide">Hier unterschreiben</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleClear}
          disabled={disabled}
          className="text-sm theme-text-tertiary hover:theme-text-primary transition-colors disabled:opacity-50"
        >
          Zurücksetzen
        </button>

        {value && (
          <span className="text-sm theme-text-tertiary flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Erfasst
          </span>
        )}
      </div>
    </div>
  )
}

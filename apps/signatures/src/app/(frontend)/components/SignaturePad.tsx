'use client'

import React, { useRef, useCallback } from 'react'
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
          'relative border rounded-lg overflow-hidden bg-white',
          error ? 'border-red-500' : 'border-gray-200',
        )}
      >
        <SignatureCanvas
          ref={canvasRef}
          canvasProps={{
            className: 'w-full h-48 cursor-crosshair touch-none',
            'aria-label': 'Unterschrift',
          }}
          onEnd={handleEnd}
          backgroundColor="rgb(255, 255, 255)"
          penColor="rgb(0, 0, 0)"
        />

        {/* Hint text */}
        {!value && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-gray-400 text-sm">Hier unterschreiben</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleClear}
          disabled={disabled}
          className="text-sm theme-text-secondary hover:theme-text-primary transition-colors link-underline disabled:opacity-50"
        >
          Zurücksetzen
        </button>

        {value && (
          <span className="text-xs theme-text-tertiary flex items-center gap-1">
            <svg
              className="w-4 h-4 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Unterschrift erfasst
          </span>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

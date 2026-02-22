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
          'relative border bg-white transition-colors',
          error ? 'border-red-300' : 'border-neutral-200',
        )}
      >
        <SignatureCanvas
          ref={canvasRef}
          canvasProps={{
            className: 'w-full h-40 cursor-crosshair touch-none',
            'aria-label': 'Unterschrift',
          }}
          onEnd={handleEnd}
          backgroundColor="rgb(255, 255, 255)"
          penColor="rgb(0, 0, 0)"
        />

        {/* Hint text */}
        {!value && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-neutral-300 text-sm tracking-wide">Hier unterschreiben</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleClear}
          disabled={disabled}
          className="text-xs theme-text-tertiary hover:theme-text-secondary transition-colors uppercase tracking-wide disabled:opacity-50"
        >
          Zurücksetzen
        </button>

        {value && (
          <span className="text-xs theme-text-tertiary flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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

import React from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'

interface PayloadImageProps {
  media: Media | number | null | undefined
  size?: 'original' | 'thumbnail' | 'card' | 'tablet' | 'hero'
  alt?: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
  placeholder?: 'blur' | 'empty'
}

/**
 * A Next.js Image component wrapper for PayloadCMS Media.
 * 
 * Usage:
 * ```tsx
 * // With full media object from Payload
 * <PayloadImage media={mediaDoc} size="card" />
 * 
 * // With priority loading (above the fold)
 * <PayloadImage media={heroImage} size="hero" priority />
 * 
 * // With fill mode (responsive container)
 * <PayloadImage media={mediaDoc} fill className="object-cover" />
 * ```
 */
export function PayloadImage({
  media,
  size = 'original',
  alt,
  className,
  fill,
  width,
  height,
  priority = false,
  sizes,
  placeholder = 'blur',
}: PayloadImageProps) {
  // Handle case where media is just an ID (number)
  if (typeof media === 'number' || !media) {
    return null
  }

  // Determine which URL to use based on size
  const imageUrl =
    size === 'original' || !media.sizes?.[size]
      ? media.url
      : media.sizes[size]?.url

  if (!imageUrl) {
    return null
  }

  // Use blurDataURL from Payload if available
  const blurDataURL = placeholder === 'blur' ? media.blurDataURL : undefined

  // Get dimensions from the selected size or original
  const sizeData = size === 'original' ? media : media.sizes?.[size]
  const imgWidth = width ?? sizeData?.width ?? undefined
  const imgHeight = height ?? sizeData?.height ?? undefined

  return (
    <Image
      src={imageUrl}
      alt={alt ?? media.alt ?? ''}
      className={className}
      fill={fill}
      width={fill ? undefined : imgWidth}
      height={fill ? undefined : imgHeight}
      priority={priority}
      sizes={sizes}
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={blurDataURL ?? undefined}
    />
  )
}

/**
 * Get image URL from Payload media with optional size
 */
export function getMediaUrl(
  media: Media | number | null | undefined,
  size: 'original' | 'thumbnail' | 'card' | 'tablet' | 'hero' = 'original'
): string | null {
  if (typeof media === 'number' || !media) {
    return null
  }

  if (size === 'original' || !media.sizes?.[size]) {
    return media.url ?? null
  }

  return media.sizes[size]?.url ?? media.url ?? null
}

/**
 * Get blur placeholder from Payload media
 */
export function getBlurDataURL(
  media: Media | number | null | undefined
): string | null {
  if (typeof media === 'number' || !media) {
    return null
  }
  return media.blurDataURL ?? null
}

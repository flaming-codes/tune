'use client'

import React, { useRef, useState, useCallback } from 'react'
import { PayloadImage } from '@/components/PayloadImage'
import type { TeamMember, Media } from '@/payload-types'

interface TeamProps {
  members: TeamMember[]
}

interface TeamMemberCardProps {
  member: TeamMember
}

// Distance threshold in pixels before swapping to the next image
const SWAP_DISTANCE_THRESHOLD = 140

// Rotation and scale variation per image in the stack
const ROTATION_STEP = 3 // degrees
const SCALE_STEP = 0.03
const MAX_ROTATION = 12
const MAX_SCALE = 1.08

function TeamMemberCard({ member }: TeamMemberCardProps) {
  const photos = (member.photos as Media[]) || []
  const hasMultiplePhotos = photos.length > 1

  // Track which images are currently in the stack (visible)
  const [stackSize, setStackSize] = useState(1)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Track cursor movement distance
  const totalDistanceRef = useRef(0)
  const lastPositionRef = useRef<{ x: number; y: number } | null>(null)

  const handleMouseEnter = useCallback(() => {
    totalDistanceRef.current = 0
    lastPositionRef.current = null
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!hasMultiplePhotos) return

      const { clientX, clientY } = e

      if (lastPositionRef.current) {
        const dx = clientX - lastPositionRef.current.x
        const dy = clientY - lastPositionRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        totalDistanceRef.current += distance

        // Check if we've moved enough to add next image to stack
        if (totalDistanceRef.current >= SWAP_DISTANCE_THRESHOLD) {
          setCurrentIndex((prev) => {
            const nextIndex = (prev + 1) % photos.length
            // Stack size increases as we cycle through images
            const newStackSize = Math.min(nextIndex + 1, photos.length)
            setStackSize(newStackSize)
            return nextIndex
          })

          // Reset distance, keeping remainder for smooth experience
          totalDistanceRef.current = totalDistanceRef.current % SWAP_DISTANCE_THRESHOLD
        }
      }

      lastPositionRef.current = { x: clientX, y: clientY }
    },
    [hasMultiplePhotos, photos.length],
  )

  const handleMouseLeave = useCallback(() => {
    // Reset stack on mouse leave
    setStackSize(1)
    setCurrentIndex(0)
    totalDistanceRef.current = 0
    lastPositionRef.current = null
  }, [])

  // Calculate transform for each image in the stack
  const getImageTransform = (index: number): string => {
    if (index === 0) return 'rotate(0deg) scale(1)'

    // Alternate rotation direction for visual interest
    const direction = index % 2 === 0 ? 1 : -1
    const rotation = Math.min(index * ROTATION_STEP, MAX_ROTATION) * direction

    // Scale alternates up and down slightly
    const scaleDirection = index % 2 === 0 ? 1 : -1
    const scale = 1 + Math.min(index * SCALE_STEP, MAX_SCALE - 1) * scaleDirection

    return `rotate(${rotation}deg) scale(${scale})`
  }

  // Get which images to show in the stack
  const getVisibleImages = () => {
    if (!hasMultiplePhotos) return [photos[0]]

    // Build the stack: show images 0 through stackSize-1
    const visible: Media[] = []
    for (let i = 0; i < stackSize && i < photos.length; i++) {
      visible.push(photos[i])
    }
    return visible
  }

  const visibleImages = getVisibleImages()

  return (
    <div className="group cursor-default">
      {/* Image Container with hover tracking */}
      {photos.length > 0 ? (
        <div
          className="aspect-[3/4] mb-6 relative"
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Base image (always visible, no transform) */}
          <div className="absolute inset-0 overflow-hidden transition-all duration-300 group-hover:shadow-lg">
            <PayloadImage
              media={photos[0]}
              size="card"
              fill
              className="object-cover"
              alt={`${member.name} - ${member.role}`}
              priority
            />
          </div>

          {/* Stacked images on top */}
          {visibleImages.slice(1).map((photo, idx) => {
            const actualIndex = idx + 1
            const transform = getImageTransform(actualIndex)

            return (
              <div
                key={photo.id}
                className="absolute inset-0 overflow-hidden shadow-lg transition-all duration-200 ease-out"
                style={{
                  transform,
                  zIndex: actualIndex + 10,
                }}
              >
                <PayloadImage
                  media={photo}
                  size="card"
                  fill
                  className="object-cover"
                  alt={`${member.name} - ${member.role} (${actualIndex + 1}/${photos.length})`}
                />
              </div>
            )
          })}
        </div>
      ) : (
        <div
          className="image-placeholder aspect-[3/4] mb-6 transition-all duration-300 group-hover:shadow-lg"
          aria-label={`${member.name} - Platzhalter`}
        />
      )}

      {/* Info */}
      <h3 className="text-lg font-medium mb-1">{member.name}</h3>
      <p className="text-sm theme-text-tertiary mb-3">{member.role}</p>
      <p className="text-sm theme-text-secondary leading-relaxed">{member.description}</p>
    </div>
  )
}

export function Team({ members }: TeamProps) {
  return (
    <section id="team" className="py-24 lg:py-36 theme-bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-20 lg:mb-28">
          <p className="text-sm tracking-wide-custom uppercase theme-text-tertiary mb-6">
            Über uns
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight">
            Unser Team
          </h2>
          <p className="mt-6 text-xl theme-text-secondary">
            Mit Leidenschaft für Ihre Lieblinge
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
          {members.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}

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

function TeamMemberCard({ member }: TeamMemberCardProps) {
  const photos = (member.photos as Media[]) || []
  const hasMultiplePhotos = photos.length > 1

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

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

        // Check if we've moved enough to swap images
        if (totalDistanceRef.current >= SWAP_DISTANCE_THRESHOLD) {
          setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)

          // Reset distance, keeping remainder for smooth experience
          totalDistanceRef.current = totalDistanceRef.current % SWAP_DISTANCE_THRESHOLD
        }
      }

      lastPositionRef.current = { x: clientX, y: clientY }
    },
    [hasMultiplePhotos, photos.length],
  )

  const handleMouseLeave = useCallback(() => {
    // Keep the last active index - don't reset
    // Just clear the tracking refs for next hover
    totalDistanceRef.current = 0
    lastPositionRef.current = null
  }, [])

  const currentPhoto = photos[currentPhotoIndex]

  return (
    <div className="group cursor-default">
      {/* Image Container with hover tracking */}
      {photos.length > 0 ? (
        <div
          className="aspect-[3/4] mb-6 relative overflow-hidden transition-all duration-300 group-hover:shadow-lg"
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="absolute inset-0"
              style={{
                opacity: index === currentPhotoIndex ? 1 : 0,
                zIndex: index === currentPhotoIndex ? 10 : 1,
              }}
            >
              <PayloadImage
                media={photo}
                size="card"
                fill
                className="object-cover"
                alt={`${member.name} - ${member.role}${photos.length > 1 ? ` (${index + 1}/${photos.length})` : ''}`}
                priority={index === 0}
              />
            </div>
          ))}
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

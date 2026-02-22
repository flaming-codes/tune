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
const SWAP_DISTANCE_THRESHOLD = 160
const MAX_STACK_SIZE = 20

// Visual variation limits
const MAX_ROTATION = 12 // degrees
const MAX_SCALE = 1.06

interface StackItem {
  photo: Media
  uniqueId: string // Unique ID for each stack entry (allows duplicates)
  rotation: number // Fixed rotation for this item
  scale: number // Fixed scale for this item
  zIndex: number // Fixed z-index for this item
}

function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function createStackItem(photo: Media, sequenceId: number, stackPosition: number): StackItem {
  // First image (bottom of stack) is always straight and scale 1
  if (stackPosition === 0) {
    return {
      photo,
      uniqueId: `${photo.id}-${sequenceId}`,
      rotation: 0,
      scale: 1,
      zIndex: stackPosition + 10,
    }
  }

  // Random rotation: mostly small angles, occasional larger ones
  // Use normal-ish distribution by averaging two random values
  const rotationRandom = (Math.random() - 0.5 + (Math.random() - 0.5)) / 2
  const rotation = rotationRandom * MAX_ROTATION * 2

  // Random scale: slight variation around 1.0
  // Again using averaged random for natural distribution
  const scaleRandom = (Math.random() - 0.5 + (Math.random() - 0.5)) / 2
  const scale = 1 + scaleRandom * (MAX_SCALE - 1) * 2

  return {
    photo,
    uniqueId: `${photo.id}-${sequenceId}`,
    rotation,
    scale,
    zIndex: stackPosition + 10,
  }
}

function TeamMemberCard({ member }: TeamMemberCardProps) {
  const photos = (member.photos as Media[]) || []
  const hasMultiplePhotos = photos.length > 1

  // Stack of visible photos with their visual properties
  const [stack, setStack] = useState<StackItem[]>(() => [createStackItem(photos[0], 0, 0)])
  const [photoIndex, setPhotoIndex] = useState(0)
  const nextSequenceIdRef = useRef(1)

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
          const nextPhotoIndex = (photoIndex + 1) % photos.length
          const nextPhoto = photos[nextPhotoIndex]

          setStack((currentStack) => {
            // New item always goes on top with the next position in sequence
            const newStackPosition = currentStack.length
            const newItem = createStackItem(
              nextPhoto,
              nextSequenceIdRef.current++,
              newStackPosition,
            )

            const newStack = [...currentStack, newItem]

            // Keep only the last MAX_STACK_SIZE items
            if (newStack.length > MAX_STACK_SIZE) {
              // Remove the oldest item but keep visual properties of remaining items unchanged
              return newStack.slice(newStack.length - MAX_STACK_SIZE)
            }
            return newStack
          })

          setPhotoIndex(nextPhotoIndex)

          // Reset distance, keeping remainder for smooth experience
          totalDistanceRef.current = totalDistanceRef.current % SWAP_DISTANCE_THRESHOLD
        }
      }

      lastPositionRef.current = { x: clientX, y: clientY }
    },
    [hasMultiplePhotos, photos, photoIndex],
  )

  const handleMouseLeave = useCallback(() => {
    // Keep the stack state as-is when mouse leaves
    // Just clear the tracking refs for next hover session
    totalDistanceRef.current = 0
    lastPositionRef.current = null
  }, [])

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
          {/* Render all images in the stack */}
          {stack.map((item, arrayIndex) => {
            const isBottom = arrayIndex === 0
            const transform = `rotate(${item.rotation}deg) scale(${item.scale})`

            return (
              <div
                key={item.uniqueId}
                className={`absolute inset-0 overflow-hidden shadow-lg transition-all duration-200 ease-out ${
                  isBottom ? 'group-hover:shadow-lg' : ''
                }`}
                style={{
                  transform,
                  zIndex: item.zIndex,
                }}
              >
                <PayloadImage
                  media={item.photo}
                  size="card"
                  fill
                  className="object-cover"
                  alt={`${member.name} - ${member.role}${stack.length > 1 ? ` (${arrayIndex + 1}/${stack.length})` : ''}`}
                  priority={isBottom}
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
    <section id="team" className="py-24 lg:py-36 theme-bg-primary overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-20 lg:mb-28">
          <p className="text-sm tracking-wide-custom uppercase theme-text-tertiary mb-6">
            Über uns
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight">
            Unser Team
          </h2>
          <p className="mt-6 text-xl theme-text-secondary">Mit Leidenschaft für Ihre Lieblinge</p>
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

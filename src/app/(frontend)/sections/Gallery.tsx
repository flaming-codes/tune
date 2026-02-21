'use client'

import React from 'react'
import { motion } from 'motion/react'
import { PayloadImage } from '@/components/PayloadImage'
import type { GalleryImage } from '@/payload-types'

interface GalleryProps {
  images: GalleryImage[]
}

export function Gallery({ images }: GalleryProps) {
  // Separate featured images from regular ones
  const featuredImages = images.filter((img) => img.isFeatured)
  const regularImages = images.filter((img) => !img.isFeatured)

  // Take first featured image for the large display (if any)
  const primaryFeatured = featuredImages[0]
  const remainingImages = featuredImages.slice(1).concat(regularImages)

  return (
    <section className="py-24 lg:py-36 theme-bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-16 lg:mb-24">
          <p className="text-sm tracking-wide-custom uppercase theme-text-tertiary mb-6">
            Galerie
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight">
            Das sind unsere tierischen Patienten
          </h2>
          <p className="mt-6 theme-text-secondary leading-relaxed">
            Schau Dir unsere Galerie an! Du warst noch nicht bei uns? Dann fehlt genau Dein Haustier hier.
          </p>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-12 theme-text-secondary">
            Noch keine Bilder in der Galerie.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Large featured image */}
            {primaryFeatured && (
              <motion.div
                className="col-span-2 row-span-2"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div className="w-full h-full min-h-[300px] lg:min-h-[500px] relative overflow-hidden cursor-pointer">
                  <PayloadImage
                    media={primaryFeatured.image}
                    size="hero"
                    fill
                    className="object-cover"
                    alt={primaryFeatured.title}
                  />
                </div>
              </motion.div>
            )}

            {/* Regular images - display up to 6 */}
            {remainingImages.slice(0, 6).map((image, index) => {
              // Create a visually interesting layout
              const isWide = index === 4 && remainingImages.length > 5
              
              return (
                <motion.div
                  key={image.id}
                  className={isWide ? 'col-span-2' : ''}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div 
                    className={`relative overflow-hidden cursor-pointer ${
                      isWide ? 'aspect-[2/1]' : 'aspect-square'
                    }`}
                  >
                    <PayloadImage
                      media={image.image}
                      size={isWide ? 'tablet' : 'card'}
                      fill
                      className="object-cover"
                      alt={image.title}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

'use client'

import React from 'react'
import { motion } from 'motion/react'

export function Gallery() {
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Large portrait image */}
          <motion.div
            className="col-span-2 row-span-2"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div
              className="image-placeholder w-full h-full min-h-[300px] lg:min-h-[500px] cursor-pointer"
              aria-label="Tierportrait - Platzhalter"
            />
          </motion.div>

          {/* Regular images */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <div
              className="image-placeholder aspect-square cursor-pointer"
              aria-label="Tierfoto - Platzhalter"
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <div
              className="image-placeholder aspect-square cursor-pointer"
              aria-label="Tierfoto - Platzhalter"
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <div
              className="image-placeholder aspect-square cursor-pointer"
              aria-label="Tierfoto - Platzhalter"
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <div
              className="image-placeholder aspect-square cursor-pointer"
              aria-label="Tierfoto - Platzhalter"
            />
          </motion.div>
          <motion.div
            className="col-span-2"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="image-placeholder aspect-[2/1] cursor-pointer"
              aria-label="Weitwinkel Tierfoto - Platzhalter"
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <div
              className="image-placeholder aspect-square cursor-pointer"
              aria-label="Tierfoto - Platzhalter"
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <div
              className="image-placeholder aspect-square cursor-pointer"
              aria-label="Tierfoto - Platzhalter"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

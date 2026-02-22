'use client'

import React from 'react'
import { motion } from 'motion/react'

interface OpeningHour {
  day: string
  times: string
  id?: string | null
}

interface HoursProps {
  content: {
    eyebrow: string
    headline: string
    description: string
    openingHours: OpeningHour[]
    emergency: {
      title: string
      description: string
    }
  }
  phone: string
}

const RollingText = ({ children }: { children: React.ReactNode }) => (
  <span className="relative block overflow-hidden px-1 -mx-1">
    <motion.div
      variants={{
        initial: { y: 0 },
        hovered: { y: '-100%' },
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
    <motion.div
      className="absolute inset-0 px-1"
      variants={{
        initial: { y: '100%' },
        hovered: { y: 0 },
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  </span>
)

export function Hours({ content, phone }: HoursProps) {
  return (
    <section className="py-24 lg:py-36 theme-bg-dark-section theme-text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <p className="text-sm tracking-wide-custom uppercase theme-text-muted-dark mb-6">
              {content.eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight mb-8 text-white">
              {content.headline}
            </h2>
            <p className="theme-text-muted-dark leading-relaxed max-w-md">{content.description}</p>
          </div>

          <div>
            <dl className="space-y-0">
              {content.openingHours.map((item, index) => (
                <motion.div
                  key={item.id || item.day}
                  initial="initial"
                  whileHover="hovered"
                  className={`flex justify-between items-center py-5 group cursor-default ${
                    index !== content.openingHours.length - 1 ? 'border-b border-neutral-700' : ''
                  }`}
                >
                  <dt className="theme-text-muted-dark transition-colors duration-300 group-hover:text-white">
                    <RollingText>{item.day}</RollingText>
                  </dt>
                  <dd className="font-medium text-right text-white">
                    <RollingText>{item.times}</RollingText>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-neutral-700">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2 text-white">{content.emergency.title}</h3>
              <p className="theme-text-muted-dark text-sm">{content.emergency.description}</p>
            </div>
            <motion.a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-neutral-900 text-sm font-medium"
              whileHover={{ opacity: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              {phone}
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}

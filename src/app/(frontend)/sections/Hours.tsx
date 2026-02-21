'use client'

import React from 'react'
import { motion } from 'motion/react'
import type { SiteSetting } from '@/payload-types'

interface OpeningHour {
  day: string
  times: string
  id?: string | null
}

interface HoursProps {
  openingHours: OpeningHour[]
  emergency: SiteSetting['emergency']
  phone: string
}

export function Hours({ openingHours, emergency, phone }: HoursProps) {
  return (
    <section className="py-24 lg:py-36 theme-bg-dark-section theme-text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Header */}
          <div>
            <p className="text-sm tracking-wide-custom uppercase theme-text-muted-dark mb-6">
              Öffnungszeiten
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight mb-8 text-white">
              Wann wir für Sie da sind
            </h2>
            <p className="theme-text-muted-dark leading-relaxed max-w-md">
              Flexible Öffnungszeiten für Sie und Ihre Lieblinge. 
              Auch Hausbesuche sind nach Vereinbarung möglich.
            </p>
          </div>

          {/* Hours List */}
          <div>
            <dl className="space-y-0">
              {openingHours.map((item, index) => (
                <motion.div
                  key={item.id || item.day}
                  className={`flex justify-between items-center py-5 ${
                    index !== openingHours.length - 1 ? 'border-b border-neutral-700' : ''
                  }`}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <dt className="theme-text-muted-dark">{item.day}</dt>
                  <dd className="font-medium text-right text-white">{item.times}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>

        {/* Emergency Note */}
        <div className="mt-20 pt-12 border-t border-neutral-700">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2 text-white">{emergency.title}</h3>
              <p className="theme-text-muted-dark text-sm">
                {emergency.description}
              </p>
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

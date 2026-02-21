'use client'

import React from 'react'
import { motion } from 'motion/react'

const hours = [
  { day: 'Montag', times: '12:30 – 14:30 und 17:00 – 19:00' },
  { day: 'Dienstag', times: '08:30 – 12:00 und 17:00 – 19:00' },
  { day: 'Mittwoch', times: '12:30 – 14:30 und 17:00 – 19:00' },
  { day: 'Donnerstag', times: '08:30 – 12:30 und 17:00 – 19:00' },
  { day: 'Freitag', times: '09:00 – 12:00 und 17:00 – 19:00' },
  { day: 'Samstag', times: 'Nach Vereinbarung' },
  { day: 'Sonntag', times: 'Geschlossen' },
]

export function Hours() {
  return (
    <section className="py-24 lg:py-36 theme-bg-dark theme-text-inverse">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Header */}
          <div>
            <p className="text-sm tracking-wide-custom uppercase theme-text-muted mb-6">
              Öffnungszeiten
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight mb-8">
              Wann wir für Sie da sind
            </h2>
            <p className="theme-text-muted leading-relaxed max-w-md">
              Flexible Öffnungszeiten für Sie und Ihre Lieblinge. 
              Auch Hausbesuche sind nach Vereinbarung möglich.
            </p>
          </div>

          {/* Hours List */}
          <div>
            <dl className="space-y-0">
              {hours.map((item, index) => (
                <motion.div
                  key={item.day}
                  className={`flex justify-between items-center py-5 ${
                    index !== hours.length - 1 ? 'border-b border-neutral-800' : ''
                  }`}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <dt className="theme-text-muted">{item.day}</dt>
                  <dd className="font-medium text-right text-white">{item.times}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>

        {/* Emergency Note */}
        <div className="mt-20 pt-12 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2 text-white">Notfälle außerhalb der Öffnungszeiten</h3>
              <p className="theme-text-muted text-sm">
                Bei Notfällen rufen Sie uns bitte an. Wir sind für Sie erreichbar.
              </p>
            </div>
            <motion.a
              href="tel:+4369919012012"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-neutral-900 text-sm font-medium"
              whileHover={{ opacity: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              +43 699 190 12 012
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}

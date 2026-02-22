'use client'

import React from 'react'
import { motion, useReducedMotion } from 'motion/react'

interface CvEntry {
  id?: string | null
  period: string
  title: string
  institution?: string | null
  description?: string | null
}

interface MemberCvProps {
  content: {
    eyebrow: string
    headline: string
    entries: CvEntry[]
  }
}

export function MemberCv({ content }: MemberCvProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-20 lg:py-28 theme-bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mb-12 lg:mb-16">
          <p className="text-sm tracking-wide-custom uppercase theme-text-tertiary mb-4">
            {content.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight">
            {content.headline}
          </h2>
        </div>

        <ol className="divide-y theme-border-primary border-y" aria-label="Lebenslauf">
          {content.entries.map((entry, index) => (
            <motion.li
              key={entry.id || `${entry.period}-${entry.title}-${index}`}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-7"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : index * 0.03 }}
            >
              <p className="md:col-span-3 text-sm theme-text-tertiary">{entry.period}</p>
              <div className="md:col-span-9">
                <p className="text-lg font-medium theme-text-primary">{entry.title}</p>
                {entry.institution ? (
                  <p className="text-sm mt-1 theme-text-secondary">{entry.institution}</p>
                ) : null}
                {entry.description ? (
                  <p className="text-sm mt-3 leading-relaxed theme-text-secondary">
                    {entry.description}
                  </p>
                ) : null}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

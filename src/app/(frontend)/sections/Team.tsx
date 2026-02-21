'use client'

import React from 'react'
import { motion } from 'motion/react'

const teamMembers = [
  {
    name: 'Dr. Tune Lazri',
    role: 'Tierarzt',
    description: 'Gründer und leitender Tierarzt der Praxis. Mit Leidenschaft und Herz für jeden Patienten.',
  },
  {
    name: 'Mast. Uni. Etleva Naci',
    role: 'Tierärztin',
    description: 'Spezialisiert auf innere Medizin und chirurgische Eingriffe.',
  },
  {
    name: 'Christina Strand',
    role: 'Tierarzthelferin',
    description: 'Ihr Ansprechpartner für Terminvereinbarungen und erste Beratung.',
  },
  {
    name: 'Ewa Bernadeta Winiarska',
    role: 'Unterstützungsteam',
    description: 'Back-up und Unterstützung in allen Bereichen der Praxis.',
  },
]

export function Team() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              className="group cursor-default"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {/* Image Placeholder */}
              <div
                className="image-placeholder aspect-[3/4] mb-6 transition-all duration-300 group-hover:shadow-lg"
                aria-label={`${member.name} - Platzhalter`}
              />

              {/* Info */}
              <h3 className="text-lg font-medium mb-1">{member.name}</h3>
              <p className="text-sm theme-text-tertiary mb-3">{member.role}</p>
              <p className="text-sm theme-text-secondary leading-relaxed">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import React from 'react'
import { motion } from 'motion/react'

const testimonials = [
  {
    text: 'Wir sind so froh, dass wir den Herrn Doktor als Tierarzt haben. Ist wirklich ein sehr guter Tierarzt und hilfsbereit. Sehr empfehlenswert.',
    author: 'Zufriedene Kundin',
  },
  {
    text: 'Hr. Dr. Tune Lazri ist ein sehr netter, lustiger und kompetenter Arzt. Er nimmt sich für seine Patienten vierbeiner immer genug Zeit, man hat das Gefühl, dass er die Tiere versteht und liebt.',
    author: 'Tierliebhaberin',
  },
  {
    text: 'Sehr netter und kompetenter Arzt. Man fühlt sich wohl und er ist immer eine Ansprechperson. Er hat uns sofort geholfen, ohne Termin.',
    author: 'Dankbare Besitzerin',
  },
  {
    text: 'Der beste Tierarzt, sehr freundlich zu Mensch und Tier! Preisverhältnis top.',
    author: 'Stammkunde',
  },
  {
    text: 'Dr. Tune Lazri hat meiner Baby Katze mitten in der Nacht durch eine Not OP das Leben gerettet! Dieser Tierarzt ist Goldwert!',
    author: 'Katzenbesitzerin',
  },
  {
    text: 'Der beste Tierarzt den wir je hatten. Man merkt, dass ihm die Tiere wirklich am Herzen liegen! Absolute Empfehlung!',
    author: 'Besitzerin von 2 Katzen',
  },
]

export function Testimonials() {
  return (
    <section className="py-24 lg:py-36 theme-bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20 lg:mb-28">
          <p className="text-sm tracking-wide-custom uppercase theme-text-tertiary mb-6">
            Erfahrungen
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight">
            Was die Lieblingsmenschen unserer Fellnasen über uns sagen
          </h2>
          <p className="mt-6 theme-text-secondary leading-relaxed">
            Wir reden ungern über uns selbst, daher lassen wir lieber die Frauchen und Herrchen erzählen. 
            Schau Dir ihre Erfahrungen an und überzeuge Dich selbst!
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.blockquote
              key={index}
              className="flex flex-col justify-between p-8 theme-bg-secondary cursor-default"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <p className="theme-text-primary leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <footer className="text-sm theme-text-tertiary">
                — {testimonial.author}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

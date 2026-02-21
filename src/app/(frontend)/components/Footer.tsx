'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
          {/* Brand */}
          <div>
            <p className="text-white text-sm font-medium mb-4">Dr. Tune Lazri</p>
            <p className="text-sm leading-relaxed">
              Tierarztpraxis mit Leidenschaft für Ihre Lieblinge.
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white text-sm font-medium mb-4">Kontakt</p>
            <address className="not-italic text-sm leading-relaxed space-y-2">
              <p>Brünnerstraße 219-221</p>
              <p>1 TOP 60, 1210 Wien</p>
              <p>Einkaufszentrum B7</p>
              <p className="mt-4">
                <motion.a
                  href="tel:+4369919012012"
                  className="hover:text-white transition-colors inline-block"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  +43 699 190 12 012
                </motion.a>
              </p>
              <p>
                <motion.a
                  href="mailto:contact@tierarztpraxis-lazri.at"
                  className="hover:text-white transition-colors inline-block"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  contact@tierarztpraxis-lazri.at
                </motion.a>
              </p>
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-white text-sm font-medium mb-4">Links</p>
            <ul className="space-y-2 text-sm">
              <li>
                <motion.div whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
                  <Link href="#leistungen" className="hover:text-white transition-colors inline-block">
                    Leistungen
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
                  <Link href="#team" className="hover:text-white transition-colors inline-block">
                    Über uns
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
                  <Link href="#kontakt" className="hover:text-white transition-colors inline-block">
                    Kontakt
                  </Link>
                </motion.div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs">
            © {new Date().getFullYear()} Tierarztpraxis Dr. Tune Lazri. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs">
            Mit Leidenschaft für Ihre Lieblinge.
          </p>
        </div>
      </div>
    </footer>
  )
}

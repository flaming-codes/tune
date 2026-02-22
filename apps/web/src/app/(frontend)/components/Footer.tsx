import React from 'react'
import Link from 'next/link'
import { getGoogleMapsDirectionsUrl, LEGAL_LINKS } from '@/lib/constants'

interface NavLink {
  label: string
  href: string
  id?: string | null
}

interface FooterProps {
  practiceName: string
  footer: {
    tagline: string
    copyright: string
  }
  contact: {
    address: {
      street: string
      city: string
      additional?: string | null
    }
    phone: string
    email: string
  }
  navLinks: NavLink[]
}

export function Footer({ practiceName, footer, contact, navLinks }: FooterProps) {
  const { address, phone, email } = contact

  const quickLinks = [...navLinks]
  for (const legalLink of LEGAL_LINKS) {
    const exists = quickLinks.some((link) => link.href === legalLink.href)
    if (!exists) {
      quickLinks.push(legalLink)
    }
  }

  return (
    <footer className="theme-bg-dark-section theme-text-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
          {/* Brand */}
          <div>
            <p className="text-white text-sm font-medium mb-4">{practiceName}</p>
            <p className="text-sm theme-text-muted-dark leading-relaxed">{footer.tagline}</p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white text-sm font-medium mb-4">Kontakt</p>
            <address className="not-italic text-sm theme-text-muted-dark leading-relaxed space-y-2">
              <a
                href={getGoogleMapsDirectionsUrl(address)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors link-underline link-highlight link-highlight-stack"
              >
                <p>{address.street}</p>
                <p>{address.additional}</p>
                <p>{address.city}</p>
              </a>
              <p className="mt-4">
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="hover:text-white transition-colors link-underline link-highlight"
                >
                  {phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${email}`}
                  className="hover:text-white transition-colors link-underline link-highlight"
                >
                  {email}
                </a>
              </p>
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-white text-sm font-medium mb-4">Links</p>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.id || link.href}>
                  <Link
                    href={link.href}
                    className="theme-text-muted-dark hover:text-white transition-colors link-underline link-highlight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs theme-text-muted-dark">
            © {new Date().getFullYear()} {practiceName}. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs theme-text-muted-dark">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}

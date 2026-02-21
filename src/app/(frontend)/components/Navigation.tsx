'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface NavLink {
  label: string
  href: string
  id?: string | null
}

interface NavigationProps {
  practiceName: string
  navLinks: NavLink[]
  phone: string
}

export function Navigation({ practiceName, navLinks, phone }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'theme-bg-primary/95 backdrop-blur-sm py-4 shadow-sm' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-sm font-medium tracking-tight-custom theme-text-primary">
            {practiceName}
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.id || link.href}>
                <Link
                  href={link.href}
                  className="text-sm theme-text-secondary hover:theme-text-primary transition-colors link-underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Phone CTA */}
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="hidden md:flex items-center gap-2 text-sm font-medium theme-text-primary"
          >
            <span>{phone}</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={`block h-px theme-bg-dark transition-transform ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-px theme-bg-dark transition-opacity ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-px theme-bg-dark transition-transform ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
                }`}
              />
            </div>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 theme-bg-primary border-t theme-border-primary py-8">
            <ul className="flex flex-col items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.id || link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg theme-text-secondary hover:theme-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="text-lg font-medium mt-4 theme-text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {phone}
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}

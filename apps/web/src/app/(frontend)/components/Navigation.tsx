'use client'

import React, { useState, useEffect, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { motion, AnimatePresence, type Variants, type Easing } from 'motion/react'
import { cn } from '@/lib/utils'

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

// Custom easing - cubic-bezier(0.4, 0, 0.2, 1) = ease-out
const easeOut: Easing = [0.4, 0, 0.2, 1]

// Animation variants
const menuVariants: Variants = {
  closed: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: easeOut,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
}

const staggerVariants: Variants = {
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  closed: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
      ease: easeOut,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
}

const MAX_DESKTOP_PRIMARY_LINKS = 4

const emptySubscribe = () => () => {}

export function Navigation({ practiceName, navLinks, phone }: NavigationProps) {
  const pathname = usePathname()

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [desktopMenuValue, setDesktopMenuValue] = useState('')
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  // Handle scroll for header styling
  useEffect(() => {
    const SCROLL_DOWN_THRESHOLD = 56
    const SCROLL_UP_THRESHOLD = 28

    const handleScroll = () => {
      const scrollY = window.scrollY

      setIsScrolled((current) => {
        if (!current && scrollY > SCROLL_DOWN_THRESHOLD) return true
        if (current && scrollY < SCROLL_UP_THRESHOLD) return false
        return current
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMobileMenuOpen])

  // Filter out "Home" from nav links
  const filteredNavLinks = navLinks.filter(
    (link) => link.label.toLowerCase() !== 'home' && link.href !== '/',
  )

  const resolvedNavLinks = filteredNavLinks.map((link) => {
    if (!link.href.startsWith('#')) {
      return link
    }

    return {
      ...link,
      href: pathname === '/' ? link.href : `/${link.href}`,
    }
  })

  const primaryDesktopLinks = resolvedNavLinks.slice(0, MAX_DESKTOP_PRIMARY_LINKS)
  const overflowDesktopLinks = resolvedNavLinks.slice(MAX_DESKTOP_PRIMARY_LINKS)

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 isolate theme-transition"
      initial={false}
      animate={{
        paddingTop: isScrolled || isMobileMenuOpen ? 16 : 24, // py-4 = 16px, py-6 = 24px
        paddingBottom: isScrolled || isMobileMenuOpen ? 16 : 24,
      }}
      transition={{ duration: 0.3, ease: easeOut }}
    >
      {/* Animated background layer handling all visual transitions */}
      <motion.div
        className={cn(
          'absolute inset-0 -z-10 border-b backdrop-blur-lg border-neutral-200/20 dark:border-neutral-800/20 opacity-100',
          isMobileMenuOpen ? 'theme-bg-primary' : 'theme-bg-primary-glass',
        )}
        initial={false}
        transition={{ duration: 0.3, ease: easeOut }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <NavigationMenu.Root
          className="relative"
          value={desktopMenuValue}
          onValueChange={setDesktopMenuValue}
          delayDuration={120}
          skipDelayDuration={80}
        >
          <nav
            className="flex items-center justify-between relative z-50"
            aria-label="Main Navigation"
          >
            {/* Logo */}
            <Link
              href="/"
              className="text-sm font-medium tracking-tight-custom theme-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-(--accent-primary)"
            >
              {practiceName}
            </Link>

            {/* Desktop Navigation - Controlled Radix NavigationMenu */}
            <NavigationMenu.List className="hidden md:flex items-center gap-8 list-none m-0 p-0 relative">
              {primaryDesktopLinks.map((link) => (
                <NavigationMenu.Item key={link.id || link.href} value={link.href}>
                  <NavigationMenu.Link asChild>
                    <Link
                      href={link.href}
                      className="text-sm theme-text-secondary hover:theme-text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-(--accent-primary) px-1 -mx-1"
                    >
                      <span className="link-underline link-highlight">{link.label}</span>
                    </Link>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              ))}

              {overflowDesktopLinks.length > 0 ? (
                <NavigationMenu.Item value="more">
                  <NavigationMenu.Trigger className="group inline-flex items-center gap-2 text-sm theme-text-secondary hover:theme-text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-(--accent-primary) px-1 -mx-1">
                    <span className="link-underline link-highlight">Mehr</span>
                    <motion.span
                      aria-hidden="true"
                      animate={{ rotate: desktopMenuValue === 'more' ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: easeOut }}
                    >
                      ▾
                    </motion.span>
                  </NavigationMenu.Trigger>

                  <NavigationMenu.Content asChild>
                    <motion.div
                      className="absolute right-0 top-full mt-4 w-64 theme-bg-primary border theme-border-primary shadow-xl z-50"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2, ease: easeOut }}
                    >
                      <ul className="list-none m-0 p-2">
                        {overflowDesktopLinks.map((link) => (
                          <li key={link.id || link.href}>
                            <NavigationMenu.Link asChild>
                              <Link
                                href={link.href}
                                className="block px-3 py-2 text-sm theme-text-secondary hover:theme-text-primary transition-colors duration-200 link-underline link-highlight"
                                onClick={() => setDesktopMenuValue('')}
                              >
                                {link.label}
                              </Link>
                            </NavigationMenu.Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              ) : null}
            </NavigationMenu.List>

            {/* Phone CTA */}
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="hidden md:flex items-center gap-2 text-sm font-medium theme-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-(--accent-primary) px-2 -mx-2"
              aria-label={`Anrufen: ${phone}`}
            >
              <span>{phone}</span>
            </a>

            {/* Mobile Menu Button - Using Radix NavigationMenu.Trigger pattern */}
            {isMounted && (
              <NavigationMenu.Item value="mobile-menu" className="md:hidden list-none">
                <NavigationMenu.Trigger asChild>
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 theme-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-(--accent-primary)"
                    aria-label={isMobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-menu"
                  >
                    <div className="w-5 h-4 flex flex-col justify-between">
                      <motion.span
                        className="block h-px bg-current origin-center"
                        animate={{
                          rotate: isMobileMenuOpen ? 45 : 0,
                          y: isMobileMenuOpen ? 7 : 0,
                        }}
                        transition={{ duration: 0.2, ease: easeOut }}
                      />
                      <motion.span
                        className="block h-px bg-current"
                        animate={{
                          opacity: isMobileMenuOpen ? 0 : 1,
                        }}
                        transition={{ duration: 0.15 }}
                      />
                      <motion.span
                        className="block h-px bg-current origin-center"
                        animate={{
                          rotate: isMobileMenuOpen ? -45 : 0,
                          y: isMobileMenuOpen ? -7 : 0,
                        }}
                        transition={{ duration: 0.2, ease: easeOut }}
                      />
                    </div>
                  </button>
                </NavigationMenu.Trigger>
              </NavigationMenu.Item>
            )}
          </nav>

          {/* Mobile Menu - Controlled version with AnimatePresence */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                {/* Heavy Backdrop - z-30 to stay below navbar (z-50) */}
                <motion.div
                  className="fixed inset-0 bg-black/30 backdrop-blur-xl z-30 md:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-hidden="true"
                />

                {/* Menu Panel - z-40 below navbar (z-50) */}
                <motion.div
                  id="mobile-menu"
                  className="md:hidden fixed left-0 right-0 top-16.25 theme-bg-primary border-t theme-border-primary z-40 shadow-lg"
                  variants={menuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  role="dialog"
                  aria-label="Mobile Navigation"
                  aria-modal="true"
                >
                  <motion.ul
                    className="flex flex-col items-start gap-4 py-8 px-6 list-none m-0"
                    variants={staggerVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    {resolvedNavLinks.map((link) => (
                      <motion.li
                        key={link.id || link.href}
                        variants={itemVariants}
                        className="w-full"
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-lg theme-text-secondary hover:theme-text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-(--accent-primary) px-2 py-2 -mx-2 link-underline link-highlight"
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    ))}
                    <motion.li
                      variants={itemVariants}
                      className="w-full pt-4 border-t theme-border-primary mt-2"
                    >
                      <a
                        href={`tel:${phone.replace(/\s/g, '')}`}
                        className="block text-lg font-medium theme-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-(--accent-primary) px-2 py-2 -mx-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-label={`Anrufen: ${phone}`}
                      >
                        {phone}
                      </a>
                    </motion.li>
                  </motion.ul>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </NavigationMenu.Root>
      </div>
    </motion.header>
  )
}

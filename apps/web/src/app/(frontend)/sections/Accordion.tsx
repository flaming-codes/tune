'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence, type Variants } from 'motion/react'
import clsx from 'clsx'

interface AccordionItem {
  id?: string | null
  question: string
  answer: string
}

type Alignment = 'start' | 'end' | 'full'

interface AccordionProps {
  content: {
    eyebrow: string
    headline: string
    description?: string | null
    items: AccordionItem[]
    allowMultipleOpen?: boolean | null
    alignment?: Alignment | null
  }
}

// Animation variants for content height animation
const contentVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
    },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.25, delay: 0.05, ease: [0.4, 0, 0.2, 1] },
    },
  },
}

// Icon rotation animation
const iconVariants: Variants = {
  collapsed: { rotate: 0 },
  expanded: { rotate: 45 },
}

// Chevron icon component with animated rotation
function PlusIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.span
      className="flex-shrink-0 w-5 h-5 flex items-center justify-center"
      variants={iconVariants}
      initial={false}
      animate={isOpen ? 'expanded' : 'collapsed'}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </motion.span>
  )
}

// Individual accordion item component
interface AccordionItemProps {
  item: AccordionItem
  isOpen: boolean
  onToggle: () => void
  index: number
}

function AccordionItemComponent({ item, isOpen, onToggle, index }: AccordionItemProps) {
  const itemId = `accordion-item-${item.id || index}`
  const contentId = `${itemId}-content`

  return (
    <div
      className={clsx(
        'border-b theme-border-primary transition-colors duration-300',
        isOpen && 'border-neutral-900 dark:border-white',
      )}
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          className={clsx(
            'w-full flex items-center justify-between gap-4 py-6 text-left',
            'group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-(--accent-primary)',
          )}
          aria-expanded={isOpen}
          aria-controls={contentId}
          id={itemId}
        >
          <span
            className={clsx(
              'text-base font-medium transition-colors duration-300',
              isOpen ? 'theme-text-primary' : 'theme-text-secondary group-hover:theme-text-primary',
            )}
          >
            {item.question}
          </span>
          <PlusIcon isOpen={isOpen} />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            role="region"
            aria-labelledby={itemId}
            variants={contentVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className="overflow-hidden"
          >
            <div className="pb-6 pr-9">
              <p className="text-sm theme-text-secondary leading-relaxed">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Get content wrapper classes based on alignment
function getContentClasses(alignment: Alignment): string {
  switch (alignment) {
    case 'start':
      return 'max-w-3xl mr-auto' // Left-aligned content, negative space on right
    case 'end':
      return 'max-w-3xl ml-auto' // Right-aligned content, negative space on left
    case 'full':
    default:
      return '' // Full width (no max-width constraint)
  }
}

export function Accordion({ content }: AccordionProps) {
  const { eyebrow, headline, description, items, allowMultipleOpen, alignment } = content
  const [openItems, setOpenItems] = useState<Set<number | string>>(new Set())

  const resolvedAlignment = alignment || 'start'
  const contentClasses = getContentClasses(resolvedAlignment)

  const handleToggle = useCallback(
    (index: number, itemId: string | null | undefined) => {
      const key = itemId || index

      setOpenItems((prev) => {
        const next = new Set(prev)

        if (next.has(key)) {
          next.delete(key)
        } else {
          if (!allowMultipleOpen) {
            next.clear()
          }
          next.add(key)
        }

        return next
      })
    },
    [allowMultipleOpen],
  )

  if (!items.length) {
    return null
  }

  return (
    <section className="py-24 lg:py-36 theme-bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className={contentClasses}>
          {/* Header */}
          <div className="max-w-2xl mb-16 lg:mb-20">
            <p className="text-sm tracking-wide-custom uppercase theme-text-tertiary mb-6">
              {eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight mb-6">
              {headline}
            </h2>
            {description && <p className="text-lg theme-text-secondary leading-relaxed">{description}</p>}
          </div>

          {/* Accordion Items */}
          <div className="border-t theme-border-primary" role="presentation">
          {items.map((item, index) => {
            const key = item.id || index
            const isOpen = openItems.has(key)

            return (
              <AccordionItemComponent
                key={key}
                item={item}
                isOpen={isOpen}
                onToggle={() => handleToggle(index, item.id)}
                index={index}
              />
            )
          })}
          </div>
        </div>
      </div>
    </section>
  )
}

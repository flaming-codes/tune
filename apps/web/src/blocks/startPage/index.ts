import { ContactBlock } from './ContactBlock'
import { ContactFormBlock } from './ContactFormBlock'
import { FooterBlock } from './FooterBlock'
import { GalleryBlock } from './GalleryBlock'
import { HeroBlock } from './HeroBlock'
import { HoursBlock } from './HoursBlock'
import { NavigationBlock } from './NavigationBlock'
import { QuoteBlock } from './QuoteBlock'
import { ServicesBlock } from './ServicesBlock'
import { TeamBlock } from './TeamBlock'
import { TestimonialsBlock } from './TestimonialsBlock'

export const startPageHeaderBlocks = [NavigationBlock]

export const startPageLayoutBlocks = [
  HeroBlock,
  ServicesBlock,
  QuoteBlock,
  TestimonialsBlock,
  GalleryBlock,
  TeamBlock,
  HoursBlock,
  ContactBlock,
  ContactFormBlock,
]

export const startPageFooterBlocks = [FooterBlock]

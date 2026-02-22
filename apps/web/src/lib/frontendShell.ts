import type { StartPage } from '@/payload-types'

type StartPageHeaderBlock = NonNullable<StartPage['header']>[number]
type StartPageFooterBlock = NonNullable<StartPage['footer']>[number]
type StartPageBlock = NonNullable<StartPage['layout']>[number]

function findHeaderBlock<TType extends StartPageHeaderBlock['blockType']>(
  blocks: StartPage['header'] | undefined | null,
  blockType: TType,
): Extract<StartPageHeaderBlock, { blockType: TType }> | null {
  if (!Array.isArray(blocks)) return null
  return (
    blocks.find(
      (block): block is Extract<StartPageHeaderBlock, { blockType: TType }> =>
        block.blockType === blockType,
    ) || null
  )
}

function findFooterBlock<TType extends StartPageFooterBlock['blockType']>(
  blocks: StartPage['footer'] | undefined | null,
  blockType: TType,
): Extract<StartPageFooterBlock, { blockType: TType }> | null {
  if (!Array.isArray(blocks)) return null
  return (
    blocks.find(
      (block): block is Extract<StartPageFooterBlock, { blockType: TType }> =>
        block.blockType === blockType,
    ) || null
  )
}

function findLayoutBlock<TType extends StartPageBlock['blockType']>(
  blocks: StartPage['layout'] | undefined | null,
  blockType: TType,
): Extract<StartPageBlock, { blockType: TType }> | null {
  if (!Array.isArray(blocks)) return null
  return (
    blocks.find(
      (block): block is Extract<StartPageBlock, { blockType: TType }> =>
        block.blockType === blockType,
    ) || null
  )
}

export function getFrontendShellData(startPage: StartPage) {
  const navBlock = findHeaderBlock(startPage.header, 'navigation')
  const footerBlock = findFooterBlock(startPage.footer, 'footer')
  const contactBlock = findLayoutBlock(startPage.layout, 'contact')

  const practiceName = navBlock?.practiceName || 'Tierarztpraxis'
  const navLinks = navBlock?.links || []
  const phone = navBlock?.phone || contactBlock?.phone || ''

  return {
    practiceName,
    navLinks,
    phone,
    footer: {
      tagline: footerBlock?.tagline || '',
      copyright: footerBlock?.copyright || '',
    },
    contact: {
      address: contactBlock?.address || { street: '', city: '' },
      phone: contactBlock?.phone || phone,
      email: contactBlock?.email || '',
    },
  }
}

import { startPageLayoutBlocks } from '@/blocks/startPage'

import { MemberCvBlock } from './MemberCvBlock'
import { MemberHeroBlock } from './MemberHeroBlock'
import { MemberSentenceListBlock } from './MemberSentenceListBlock'

export const teamMemberPageLayoutBlocks = [
  MemberHeroBlock,
  MemberCvBlock,
  MemberSentenceListBlock,
  ...startPageLayoutBlocks,
]

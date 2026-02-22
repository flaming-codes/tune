import { startPageLayoutBlocks } from '@/blocks/startPage'

import { MemberCvBlock } from './MemberCvBlock'
import { MemberHeroBlock } from './MemberHeroBlock'

export const teamMemberPageLayoutBlocks = [MemberHeroBlock, MemberCvBlock, ...startPageLayoutBlocks]

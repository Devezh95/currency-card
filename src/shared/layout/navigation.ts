import type { EmojiName } from '@/shared/ui'

export interface NavItem {
  to: string

  shortLabel: string

  label: string
  emoji: EmojiName
}

export const NAV_ITEMS: readonly NavItem[] = [
  { to: '/rates', shortLabel: 'Rates', label: 'Exchange Rates', emoji: 'currency-exchange' },
  { to: '/cards', shortLabel: 'Cards', label: 'Kanban Cards', emoji: 'clipboard' },
]

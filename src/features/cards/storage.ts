import { readStorage, writeStorage } from '@/shared/lib/storage'
import { storedCardsSchema } from './model/schema'
import type { Card } from './model/types'

const STORAGE_KEY = 'cards:v1'

export function loadCards(): Card[] {
  const raw = readStorage(STORAGE_KEY)
  if (!raw) return []
  try {
    const result = storedCardsSchema.safeParse(JSON.parse(raw))
    return result.success ? result.data : []
  } catch {
    return []
  }
}

export function saveCards(cards: readonly Card[]): void {
  writeStorage(STORAGE_KEY, JSON.stringify(cards))
}

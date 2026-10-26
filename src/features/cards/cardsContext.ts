import { createContext } from 'react'
import type { Card, CardImage, CardInput } from './model/types'

export interface CardsContextValue {

  cards: readonly Card[]
  getCard: (id: string) => Card | undefined

  getImages: (id: string) => readonly CardImage[]
  createCard: (input: CardInput, images: readonly CardImage[]) => Card

  updateCard: (id: string, input: CardInput, images: readonly CardImage[]) => Card | undefined

  deleteCard: (id: string) => void
}

export const CardsContext = createContext<CardsContextValue | null>(null)

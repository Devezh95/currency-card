import { z } from 'zod'

const cardSavedStateSchema = z.object({ cardSaved: z.enum(['created', 'saved', 'deleted']) })

export type CardSavedState = z.infer<typeof cardSavedStateSchema>
export type CardSavedKind = CardSavedState['cardSaved']

export function getCardSaved(state: unknown): CardSavedKind | undefined {
  const result = cardSavedStateSchema.safeParse(state)
  return result.success ? result.data.cardSaved : undefined
}

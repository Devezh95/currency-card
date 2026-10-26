import { LIMITS, MESSAGES } from './constants'
import type { CardImage } from './types'

export const isImageFile = (file: File) => file.type.startsWith('image/')

export function acceptImages(
  files: readonly File[],
  current: readonly CardImage[],
): { added: CardImage[]; error: string | null } {
  const added: CardImage[] = []
  let error: string | null = null

  for (const file of files) {
    if (!isImageFile(file)) error ??= MESSAGES.imageType
    else if (file.size > LIMITS.imageBytes) error ??= MESSAGES.imageTooLarge
    else if (current.length + added.length >= LIMITS.images) error ??= MESSAGES.tooManyImages
    else added.push({ id: crypto.randomUUID(), file })
  }

  return { added, error }
}

import { LIMITS, MESSAGES } from './constants'

export function validateNewTag(tag: string, tags: readonly string[]): string | null {
  if (tags.length >= LIMITS.tags) return MESSAGES.tooManyTags
  if (tag.length > LIMITS.tagLength) return MESSAGES.tagTooLong
  const lower = tag.toLowerCase()
  if (tags.some((existing) => existing.toLowerCase() === lower)) return MESSAGES.tagDuplicate
  return null
}

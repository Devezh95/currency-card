import type { CardFormOutput } from './schema'

export function toSubmitPayload({ images, ...card }: CardFormOutput) {
  return {
    ...card,
    images: images.map(({ file }) => ({ name: file.name, size: file.size })),
  }
}

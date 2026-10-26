import { z } from 'zod'

const redirectStateSchema = z.object({ from: z.string().regex(/^\/(?![/\\])/) })

export type RedirectState = z.infer<typeof redirectStateSchema>

export function getRedirectFrom(state: unknown): string | undefined {
  const result = redirectStateSchema.safeParse(state)
  return result.success ? result.data.from : undefined
}

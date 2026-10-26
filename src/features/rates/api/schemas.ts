import { z } from 'zod'

export const ratePointSchema = z.object({
  date: z.iso.date(),
  base: z.string(),
  quote: z.string(),
  rate: z.number().positive(),
})

export const ratesResponseSchema = z.array(ratePointSchema)

export type RatePoint = z.infer<typeof ratePointSchema>

export const apiErrorSchema = z.object({ message: z.string() })

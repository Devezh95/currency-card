import { API_BASE_URL, BASE_CURRENCY } from '../config'
import { fetchJson } from './client'
import { ratesResponseSchema, type RatePoint } from './schemas'

interface RatesParams {
  quotes: readonly string[]

  from?: string

  group?: 'week' | 'month'
}

export function fetchRates({ quotes, from, group }: RatesParams, signal?: AbortSignal) {
  const params = new URLSearchParams({ base: BASE_CURRENCY, quotes: quotes.join(',') })
  if (from) params.set('from', from)
  if (group) params.set('group', group)

  return fetchJson<RatePoint[]>(
    `${API_BASE_URL}/rates?${params.toString()}`,
    ratesResponseSchema,
    signal,
  )
}

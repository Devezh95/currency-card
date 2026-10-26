import { roundTo } from '@/shared/lib/format'
import type { RatePoint } from '../api/schemas'
import { CURRENCIES, RATE_DIGITS, SPREAD, type CurrencyCode } from '../config'

export interface RateRow {
  code: CurrencyCode
  flag: string
  course: number
  surrender: number
  buy: number

  change: number
}

export interface RatesTable {

  date: string | null
  rows: RateRow[]
}

export function buildRatesTable(points: readonly RatePoint[]): RatesTable {
  const byQuote = new Map<string, RatePoint[]>()
  for (const point of points) {
    const series = byQuote.get(point.quote) ?? []
    series.push(point)
    byQuote.set(point.quote, series)
  }

  let date: string | null = null
  const rows: RateRow[] = []

  for (const { code, flag } of CURRENCIES) {
    const series = byQuote.get(code)?.sort((a, b) => a.date.localeCompare(b.date))
    const last = series?.at(-1)
    if (!series || !last) continue

    const previous = series.at(-2) ?? last
    if (!date || last.date > date) date = last.date

    rows.push({
      code,
      flag,
      course: last.rate,
      surrender: last.rate * SPREAD.surrender,
      buy: last.rate * SPREAD.buy,
      change: roundTo(last.rate - previous.rate, RATE_DIGITS),
    })
  }

  return { date, rows }
}

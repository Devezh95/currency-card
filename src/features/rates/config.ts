import aud from 'flag-icons/flags/4x3/au.svg'
import brl from 'flag-icons/flags/4x3/br.svg'
import cad from 'flag-icons/flags/4x3/ca.svg'
import chf from 'flag-icons/flags/4x3/ch.svg'
import mxn from 'flag-icons/flags/4x3/mx.svg'
import eur from 'flag-icons/flags/4x3/eu.svg'
import gbp from 'flag-icons/flags/4x3/gb.svg'
import jpy from 'flag-icons/flags/4x3/jp.svg'

export const API_BASE_URL = 'https://api.frankfurter.dev/v2'

export const BASE_CURRENCY = 'USD'

export const CURRENCIES = [
  { code: 'AUD', flag: aud },
  { code: 'BRL', flag: brl },
  { code: 'CAD', flag: cad },
  { code: 'CHF', flag: chf },
  { code: 'MXN', flag: mxn },
  { code: 'EUR', flag: eur },
  { code: 'GBP', flag: gbp },
  { code: 'JPY', flag: jpy },
] as const satisfies readonly { code: string; flag: string }[]

export type CurrencyCode = (typeof CURRENCIES)[number]['code']

export const CURRENCY_CODES: readonly CurrencyCode[] = CURRENCIES.map(({ code }) => code)

export const SPREAD = {
  surrender: 1.02,
  buy: 0.985,
} as const

export const TABLE_HISTORY_DAYS = 10

export const RATE_DIGITS = 4

export const COMPACT_LARGE_VALUE = 100
export const COMPACT_LARGE_DIGITS = 2

export interface PeriodConfig {
  id: string

  offset: { days?: number; months?: number }

  title: string

  group?: 'week'
}

export const PERIODS = [
  { id: '1W', offset: { days: 7 }, title: 'Weekly dynamics' },
  { id: '1M', offset: { months: 1 }, title: 'Monthly dynamics' },
  { id: '3M', offset: { months: 3 }, title: '3-month dynamics' },
  { id: '6M', offset: { months: 6 }, title: '6-month dynamics' },
  { id: '1Y', offset: { months: 12 }, title: 'Yearly dynamics', group: 'week' },
] as const satisfies readonly PeriodConfig[]

export type PeriodId = (typeof PERIODS)[number]['id']

export function getPeriod(id: PeriodId): PeriodConfig {
  return PERIODS.find((period) => period.id === id) ?? PERIODS[0]
}

export const DEFAULT_PERIOD: PeriodId = '1M'

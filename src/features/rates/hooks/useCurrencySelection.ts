import { useCallback } from 'react'
import { useSearchParams } from 'react-router'
import {
  CURRENCY_CODES,
  DEFAULT_PERIOD,
  PERIODS,
  type CurrencyCode,
  type PeriodId,
} from '../config'

const isCurrencyCode = (value: string | null): value is CurrencyCode =>
  CURRENCY_CODES.some((code) => code === value)

const isPeriodId = (value: string | null): value is PeriodId =>
  PERIODS.some(({ id }) => id === value)

export function useCurrencySelection() {
  const [searchParams, setSearchParams] = useSearchParams()

  const currencyParam = searchParams.get('currency')
  const periodParam = searchParams.get('period')
  const currency = isCurrencyCode(currencyParam) ? currencyParam : null
  const period = isPeriodId(periodParam) ? periodParam : DEFAULT_PERIOD

  const selectCurrency = useCallback(
    (code: CurrencyCode | null) => {
      setSearchParams((params) => {
        const next = new URLSearchParams(params)
        if (code) {
          next.set('currency', code)
          if (!isPeriodId(next.get('period'))) next.set('period', DEFAULT_PERIOD)
        } else {
          next.delete('currency')
          next.delete('period')
        }
        return next
      })
    },
    [setSearchParams],
  )

  const selectPeriod = useCallback(
    (id: PeriodId) => {
      setSearchParams(
        (params) => {
          const next = new URLSearchParams(params)
          next.set('period', id)
          return next
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  return { currency, period, selectCurrency, selectPeriod }
}

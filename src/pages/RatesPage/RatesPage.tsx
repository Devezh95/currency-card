import { useEffect, useRef } from 'react'
import { clsx } from 'clsx'
import {
  RateChartPanel,
  RatesUpdatedAt,
  RatesTableCard,
  useCurrencySelection,
  useRatesTable,
  type CurrencyCode,
} from '@/features/rates'
import { PageHeader } from '@/shared/layout/PageHeader'
import { DESKTOP_QUERY, useMediaQuery } from '@/shared/lib/useMediaQuery'
import styles from './RatesPage.module.scss'

export function RatesPage() {
  const ratesQuery = useRatesTable()
  const { currency, period, selectCurrency, selectPeriod } = useCurrencySelection()
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  const panelRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)

  const compact = currency !== null && isDesktop

  useEffect(() => {
    if (!currency || isDesktop) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    panelRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }, [currency, isDesktop])

  const handleSelect = (code: CurrencyCode) => {
    selectCurrency(code === currency ? null : code)
  }

  const handleClose = () => {
    const row = tableRef.current?.querySelector<HTMLElement>('[aria-selected="true"]')
    selectCurrency(null)
    row?.focus()
  }

  return (
    <div className={clsx(styles.page, currency && styles.withChart)}>
      <PageHeader
        title="Exchange rates"
        className={styles.header}
        aside={
          <RatesUpdatedAt
            date={ratesQuery.data?.date}
            loading={ratesQuery.isPending}
            refreshing={ratesQuery.isFetching && !ratesQuery.isPending}
          />
        }
      />
      {currency && (
        <div ref={panelRef} className={styles.panel}>
          <RateChartPanel
            code={currency}
            period={period}
            onPeriodChange={selectPeriod}
            onClose={handleClose}
            className={styles.panelFill}
          />
        </div>
      )}
      <div ref={tableRef} className={styles.table}>
        <RatesTableCard
          query={ratesQuery}
          compact={compact}
          selectedCode={currency}
          onSelect={handleSelect}
        />
      </div>
    </div>
  )
}

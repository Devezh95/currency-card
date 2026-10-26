import { formatLongDate } from '@/shared/lib/format'
import { Badge, Skeleton, Spinner } from '@/shared/ui'
import styles from './RatesUpdatedAt.module.scss'

interface RatesUpdatedAtProps {

  date: string | null | undefined
  loading: boolean

  refreshing: boolean
}

export function RatesUpdatedAt({ date, loading, refreshing }: RatesUpdatedAtProps) {
  if (loading) return <Skeleton width={128} height={30} radius={10} />
  if (!date) return null

  return (
    <div className={styles.root}>
      {refreshing && <Spinner size={16} label="Updating rates" className={styles.spinner} />}
      <Badge tone="accent" size="md">
        <time dateTime={date}>{formatLongDate(date)}</time>
      </Badge>
    </div>
  )
}

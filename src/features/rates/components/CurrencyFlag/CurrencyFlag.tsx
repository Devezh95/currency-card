import { clsx } from 'clsx'
import styles from './CurrencyFlag.module.scss'

interface CurrencyFlagProps {
  src: string
  size?: 'xs' | 'sm' | 'md'
  className?: string
}

export function CurrencyFlag({ src, size = 'sm', className }: CurrencyFlagProps) {
  return <img src={src} alt="" className={clsx(styles.flag, styles[size], className)} />
}

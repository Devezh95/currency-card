import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import styles from './Badge.module.scss'

export type BadgeTone = 'accent' | 'success' | 'danger' | 'warning' | 'purple' | 'red' | 'neutral'

interface BadgeProps {
  tone: BadgeTone

  size?: 'sm' | 'md'
  icon?: ReactNode
  className?: string
  children: ReactNode
}

export function Badge({ tone, size = 'sm', icon, className, children }: BadgeProps) {
  return (
    <span className={clsx(styles.badge, styles[tone], styles[size], className)}>
      {icon && (
        <span className={styles.icon} aria-hidden>
          {icon}
        </span>
      )}
      {children}
    </span>
  )
}

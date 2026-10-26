import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import { FieldError } from '../FieldError'
import { fieldErrorId } from './fieldErrorId'
import styles from './FormField.module.scss'

interface FormFieldProps {

  id: string
  label: ReactNode

  hideLabel?: boolean

  required?: boolean
  error?: string
  className?: string
  children: ReactNode
}

export function FormField({
  id,
  label,
  hideLabel,
  required,
  error,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={clsx(styles.field, className)}>
      <label
        htmlFor={id}
        className={clsx(styles.label, hideLabel && styles.hidden, error && styles.labelInvalid)}
      >
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      {children}
      {error && <FieldError id={fieldErrorId(id)}>{error}</FieldError>}
    </div>
  )
}

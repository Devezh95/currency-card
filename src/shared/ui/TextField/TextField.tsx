import { useId, type ComponentProps, type ReactNode } from 'react'
import { clsx } from 'clsx'
import { FormField, fieldErrorId } from '../FormField'
import styles from './TextField.module.scss'

type TextFieldProps = Omit<ComponentProps<'input'>, 'size'> & {
  label: string
  hideLabel?: boolean

  size?: 'lg' | 'md'

  startIcon?: ReactNode

  endSlot?: ReactNode
  error?: string

  invalid?: boolean
  className?: string
}

export function TextField({
  label,
  hideLabel,
  size = 'md',
  startIcon,
  endSlot,
  error,
  invalid = false,
  className,
  id,
  'aria-describedby': ariaDescribedBy,
  ...rest
}: TextFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const isInvalid = Boolean(error) || invalid
  const describedBy =
    [error && fieldErrorId(inputId), ariaDescribedBy].filter(Boolean).join(' ') || undefined

  return (
    <FormField
      id={inputId}
      label={label}
      hideLabel={hideLabel}
      required={rest.required}
      error={error}
      className={className}
    >
      <div className={clsx(styles.control, styles[size], isInvalid && styles.invalid)}>
        {startIcon && (
          <span className={styles.icon} aria-hidden>
            {startIcon}
          </span>
        )}
        <input
          id={inputId}
          className={styles.input}
          aria-invalid={isInvalid || undefined}
          aria-describedby={describedBy}
          {...rest}
        />
        {endSlot}
      </div>
    </FormField>
  )
}

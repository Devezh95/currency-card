import { useId, type ComponentProps, type MouseEvent } from 'react'
import { clsx } from 'clsx'
import { formatLongDate } from '@/shared/lib/format'
import { Emoji } from '../Emoji'
import { FormField, fieldErrorId } from '../FormField'
import styles from './DateField.module.scss'

type DateFieldProps = Omit<ComponentProps<'input'>, 'type' | 'value' | 'placeholder'> & {
  label: string

  value: string
  placeholder: string
  error?: string
}

export function DateField({
  label,
  value,
  placeholder,
  error,
  className,
  id,
  onClick,
  ...rest
}: DateFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId


const openPicker = (event: MouseEvent<HTMLInputElement>) => {
  onClick?.(event)

  try {
    event.currentTarget.showPicker()
  } catch (error) {
    console.debug('Native date picker could not be opened', error)
  }
}

  return (
    <FormField
      id={inputId}
      label={label}
      required={rest.required}
      error={error}
      className={className}
    >
      <div className={clsx(styles.control, error && styles.invalid)}>
        <span className={clsx(styles.display, !value && styles.placeholder)} aria-hidden>
          {value ? formatLongDate(value) : placeholder}
        </span>
        {!value && <Emoji name="calendar" size={16} />}
        <input
          id={inputId}
          type="date"
          value={value}
          className={styles.input}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? fieldErrorId(inputId) : undefined}
          onClick={openPicker}
          {...rest}
        />
      </div>
    </FormField>
  )
}

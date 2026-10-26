import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff,} from 'lucide-react'
import { Button, TextField } from '@/shared/ui'
import { InvalidCredentialsError } from './authService'
import { DEMO_CREDENTIALS } from './constants'
import { loginSchema, type LoginFormValues } from './schema'
import { useAuth } from './useAuth'
import styles from './LoginForm.module.scss'
import EmailStart from './assets/EmailStart.svg'
import PasswordStart from './assets/PasswordStart.svg'

const SERVER_ERROR_ID = 'login-server-error'

export function LoginForm() {
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: { email: '', password: '' },
  })

  const serverError = errors.root?.serverError?.message
  const hasFieldErrors = Boolean(errors.email ?? errors.password)

  const onSubmit = async ({ email, password }: LoginFormValues) => {
    try {
      await login(email, password)
    } catch (error) {
      const message =
        error instanceof InvalidCredentialsError ? error.message : 'Something went wrong'
      setError('root.serverError', { message })
      setFocus('email')
    }
  }

  const clearServerError = () => {
    if (serverError) clearErrors('root')
  }

  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
    >
      <div className={styles.fields} data-has-errors={hasFieldErrors || undefined}>
        <TextField
          label="Email Address"
          hideLabel
          placeholder="Email Address"
          size="lg"
          type="email"
          inputMode="email"
          autoComplete="email"
          startIcon={<img src={EmailStart} alt="" />}
          error={errors.email?.message}
          invalid={Boolean(serverError)}
          aria-describedby={serverError ? SERVER_ERROR_ID : undefined}
          {...register('email', { onChange: clearServerError })}
        />
        <TextField
          label="Password"
          hideLabel
          placeholder="Password"
          size="lg"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          startIcon={<img src={PasswordStart} alt="" />}
          endSlot={
            <button
              type="button"
              className={styles.toggle}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
              onClick={() => {
                setShowPassword((value) => !value)
              }}
            >
              {showPassword ? <EyeOff size={18} aria-hidden /> : <Eye size={18} aria-hidden />}
            </button>
          }
          error={errors.password?.message}
          invalid={Boolean(serverError)}
          aria-describedby={serverError ? SERVER_ERROR_ID : undefined}
          {...register('password', { onChange: clearServerError })}
        />
      </div>

      <div className={styles.actions}>
        {serverError && (
          <p id={SERVER_ERROR_ID} className={styles.serverError} role="alert">
            {serverError}
          </p>
        )}
        <Button type="submit" size="lg" fullWidth loading={isSubmitting}>
          Login
        </Button>
        <p className={styles.hint}>
          Login/password: {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}
        </p>
      </div>
    </form>
  )
}

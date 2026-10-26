const longDateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

const shortDateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

const pad = (value: number) => String(value).padStart(2, '0')

const fromIsoDate = (isoDate: string) => new Date(`${isoDate}T00:00:00Z`)

export function formatLongDate(isoDate: string): string {
  return longDateFormat.format(fromIsoDate(isoDate))
}

export function formatShortDate(isoDate: string): string {
  return shortDateFormat.format(fromIsoDate(isoDate))
}

export function formatTime(timestamp: number): string {
  const date = new Date(timestamp)
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export function roundTo(value: number, digits: number): number {
  const factor = 10 ** digits
  return Math.round(value * factor) / factor || 0
}

export function formatSigned(value: number, digits: number): string {
  const rounded = roundTo(value, digits)
  return `${rounded > 0 ? '+' : ''}${rounded.toFixed(digits)}`
}

export function isoDateAgo(
  { days = 0, months = 0 }: { days?: number; months?: number },
  now: Date = new Date(),
): string {
  const date = new Date(now.getFullYear(), now.getMonth() - months, now.getDate() - days)
  return `${String(date.getFullYear())}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

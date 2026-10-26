

export function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch (error) {
    console.warn(`Failed to read storage key "${key}"`, error)
    return null
  }
}

export function writeStorage(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch (error) {
    console.warn(`Failed to write storage key "${key}"`, error)
  }
}

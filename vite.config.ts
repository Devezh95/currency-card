
/// <reference types="vitest/config" />
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/currency-cards-dashboard/' : '/',
  plugins: [react()],

  server: {
    host: 'localhost',
    port: 3000,
    strictPort: true,
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
}))

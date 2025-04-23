import vue              from '@vitejs/plugin-vue'
import ui               from '@nuxt/ui/vite'
import tailwindcss      from '@tailwindcss/vite'

import { defineConfig }       from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  plugins: [
    vue(),
    ui({
      ui: {
        colors: {
          primary: 'electric-indigo',
          neutral: 'zinc'
        }
      }
    }),
    tailwindcss()
  ],
})

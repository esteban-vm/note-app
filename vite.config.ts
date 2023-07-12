import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import postCSSNesting from 'postcss-nesting'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  server: { open: true, host: true, port: 5_174 },
  preview: { open: true, host: true, port: 5_175 },
  css: { postcss: { plugins: [postCSSNesting()] } },
})

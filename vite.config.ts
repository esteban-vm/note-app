import { defineConfig, type CommonServerOptions } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import postCSSNesting from 'postcss-nesting'

const commonOptions: CommonServerOptions = { open: true, host: true }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  server: { ...commonOptions, port: 5_174 },
  preview: { ...commonOptions, port: 5_175 },
  css: { postcss: { plugins: [postCSSNesting()] } },
})

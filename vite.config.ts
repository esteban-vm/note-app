import { defineConfig, type CommonServerOptions } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import presetEnv from 'postcss-preset-env'
import { VitePWA } from 'vite-plugin-pwa'

const commonOptions: CommonServerOptions = { open: true, host: true }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      manifest: {
        name: 'Note App',
        short_name: 'Simple Note App',
        description: 'App made with React JS, Vite and TypeScript',
        display: 'fullscreen',
        orientation: 'portrait',
        start_url: '/',
        theme_color: '#f68657',
        icons: [
          {
            src: '/icons/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/icons/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      includeAssets: ['/fonts/*.ttf', '/icons/*.png', '/locales/**/*.json'],
      registerType: 'autoUpdate',
    }),
  ],
  server: { ...commonOptions, port: 5_174 },
  preview: { ...commonOptions, port: 5_175 },
  css: { postcss: { plugins: [presetEnv({ stage: 0, debug: true })] } },
  build: { target: 'ESNext' },
})

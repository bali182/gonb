import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svg from 'vite-svg-loader'
import { alphaTab } from '@coderline/alphatab/vite'

export default defineConfig({
  plugins: [react(), alphaTab(), svg({ defaultImport: 'url' })],
  appType: 'spa',
  base: './',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    chunkSizeWarningLimit: 99999,
  },
})

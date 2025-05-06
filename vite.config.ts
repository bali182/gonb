import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteAwesomeSvgLoader as svg } from 'vite-awesome-svg-loader'
import { alphaTab } from '@coderline/alphatab/vite'

export default defineConfig({
  plugins: [react(), alphaTab(), svg()],
  appType: 'spa',
  base: './',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    chunkSizeWarningLimit: 99999,
  },
  // For mobile testing:
  // ngrok http http://localhost:5173
  // server: {
  //   allowedHosts: true,
  //   host: true,
  // },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig(() => {
  return {
    server: {
      open: true,
    },
    build: {
      outDir: 'build',
      commonjsOptions: { transformMixedEsModules: true },
    },
    root: '.',
    plugins: [react(), svgr()],
  }
})

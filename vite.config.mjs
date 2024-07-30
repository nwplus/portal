import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import browserslistToEsbuild from 'browserslist-to-esbuild'

export default defineConfig(() => {
  return {
    server: {
      open: true,
      port: 3000,
    },
    build: {
      outDir: 'build',
      commonjsOptions: { transformMixedEsModules: true },
      target: browserslistToEsbuild(),
    },
    root: '.',
    plugins: [
      react({
        babel: {
          plugins: [
            [
              'babel-plugin-styled-components',
              {
                displayName: true,
              },
            ],
          ],
        },
      }),
      svgr(),
    ],
  }
})

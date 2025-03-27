import { defineConfig } from 'vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import ssrHotReload from 'vite-plugin-ssr-hot-reload'

export default defineConfig(({ mode, command }) => {
  if (command === 'build') {
    if (mode === 'client') {
      return {
        esbuild: {
          jsxImportSource: 'hono/jsx/dom'
        },
        build: {
          rollupOptions: {
            input: ['./src/client.tsx'],
            output: {
              entryFileNames: 'static/client.js'
            }
          },
          copyPublicDir: true
        }
      }
    } else {
      return {}
    }
  } else {
    return { plugins: [ssrHotReload(), cloudflare()] }
  }
})

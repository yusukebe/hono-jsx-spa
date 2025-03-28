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
            output: {
              entryFileNames: 'static/client.js'
            },
            input: './src/client.tsx'
          }
        }
      }
    } else {
      return {}
    }
  } else {
    return {
      plugins: [cloudflare(), ssrHotReload()]
    }
  }
})

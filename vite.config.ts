import { defineConfig } from 'vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import ssrHotReload from 'vite-plugin-ssr-hot-reload'
import build from '@hono/vite-build/cloudflare-workers'

export default defineConfig(({ mode, command }) => {
  if (mode === 'client') {
    return {
      esbuild: {
        jsxImportSource: 'hono/jsx/dom'
      },
      build: {
        rollupOptions: {
          output: {
            entryFileNames: 'public/assets/client.js'
          },
          input: './src/client.tsx'
        }
      }
    }
  } else {
    if (command === 'build') {
      return {
        plugins: [build()]
      }
    }
    return {
      plugins: [cloudflare(), ssrHotReload()]
    }
  }
})

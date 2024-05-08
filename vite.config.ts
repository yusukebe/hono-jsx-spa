import build from '@hono/vite-cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      esbuild: {
        jsxImportSource: 'hono/jsx/dom'
      },
      build: {
        rollupOptions: {
          input: './src/client.tsx',
          output: {
            entryFileNames: 'static/client.js'
          }
        }
      }
    }
  } else {
    return {
      plugins: [
        build(),
        devServer({
          adapter,
          entry: 'src/index.tsx'
        })
      ]
    }
  }
})

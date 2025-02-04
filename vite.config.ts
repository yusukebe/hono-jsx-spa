import build from '@hono/vite-build/cloudflare-workers'
import devServer from '@hono/vite-dev-server'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      esbuild: {
        jsxImportSource: 'hono/jsx/dom'
      },
      build: {
        manifest: true,
        rollupOptions: {
          output: {
            entryFileNames: 'public/assets/client.js'
          },
          input: './src/client.tsx'
        }
      }
    }
  } else {
    return {
      plugins: [
        build(),
        devServer({
          entry: 'src/index.tsx'
        })
      ]
    }
  }
})

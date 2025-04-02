import { defineConfig } from 'vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import react from '@vitejs/plugin-react'
import ssrHotReload from 'vite-plugin-ssr-hot-reload'
import build from '@hono/vite-build/cloudflare-workers'

export default defineConfig(({ mode, command }) => {
  if (command === 'build') {
    if (mode === 'client') {
      return {
        esbuild: {
          exclude: ['react', 'react-dom']
        },
        build: {
          rollupOptions: {
            output: {
              entryFileNames: 'static/client.js'
            },
            input: './src/client/index.tsx'
          }
        }
      }
    }
    return {
      resolve: {
        alias: {
          'react-dom/server': 'react-dom/server.edge'
        }
      },
      plugins: [build({ entry: './src/server/index.tsx' })]
    }
  }
  return {
    plugins: [
      ssrHotReload({
        entry: ['./src/server/*'],
        injectReactRefresh: true
      }),
      react(),
      cloudflare()
    ]
  }
})

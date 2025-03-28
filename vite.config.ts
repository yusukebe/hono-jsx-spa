import { defineConfig } from 'vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import react from '@vitejs/plugin-react'
import ssrHotReload from 'vite-plugin-ssr-hot-reload'

export default defineConfig(({ mode, command }) => {
  if (command === 'build' && mode === 'client') {
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

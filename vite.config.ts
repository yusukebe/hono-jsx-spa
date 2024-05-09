import build from '@hono/vite-cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  const common = {
    resolve: {
      alias: {
        react: 'hono/jsx/dom',
        'react-dom': 'hono/jsx/dom'
      }
    }
  }
  if (mode === 'client') {
    return {
      ...common,
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
      ...common,
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

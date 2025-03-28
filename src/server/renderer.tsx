import { env } from 'cloudflare:workers'
import { reactRenderer } from '@hono/react-renderer'

export const renderer = reactRenderer(({ children }) => {
  return (
    <html>
      <head>
        <script
          type="module"
          src={env.ENVIRONMENT === 'production' ? '/static/client.js' : '/src/client/index.tsx'}
        ></script>
      </head>
      <body>{children}</body>
    </html>
  )
})

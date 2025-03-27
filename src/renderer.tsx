import { env } from 'cloudflare:workers'
import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html>
      <head>
        <link href="/static/style.css" rel="stylesheet" />
        <script type="module" src={env.ENVIRONMENT === 'production' ? '/static/client.js' : '/src/client.tsx'}></script>
      </head>
      <body>{children}</body>
    </html>
  )
})

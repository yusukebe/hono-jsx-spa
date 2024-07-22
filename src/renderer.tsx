import { jsxRenderer } from 'hono/jsx-renderer'
import { Script } from './components/script'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html>
      <head>
        <link href="/static/style.css" rel="stylesheet" />
        <Script src="/src/client.tsx" />
      </head>
      <body>{children}</body>
    </html>
  )
})

import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html>
      <head>
        <link href="/assets/style.css" rel="stylesheet" />
        <script type="module" src={import.meta.env.PROD ? '/assets/client.js' : '/src/client.tsx'}></script>
      </head>
      <body>{children}</body>
    </html>
  )
})

import { reactRenderer } from '@hono/react-renderer'

export const renderer = reactRenderer(({ children }) => {
  return (
    <html>
      <head>
        <script type="module" src={import.meta.env.PROD ? '/static/client.js' : '/src/client/index.tsx'}></script>
      </head>
      <body>{children}</body>
    </html>
  )
})

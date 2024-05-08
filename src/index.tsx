import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.html(
    <html>
      <head>
        <link href="/static/style.css" rel="stylesheet" />
        {import.meta.env.PROD ? (
          <script type="module" src="/static/client.js"></script>
        ) : (
          <script type="module" src="/src/client.tsx"></script>
        )}
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>
  )
})

const apiRoutes = app.get('/api', (c) => {
  return c.json({
    name: 'Hono'
  })
})

export type ApiType = typeof apiRoutes

export default app

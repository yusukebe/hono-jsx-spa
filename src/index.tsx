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

app.post('/api', async (c) => {
  const { name } = await c.req.parseBody<{ name: string }>()
  return c.json({
    name
  })
})

export default app

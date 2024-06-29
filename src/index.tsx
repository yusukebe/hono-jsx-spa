import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

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

const schema = z.object({
  name: z.string()
})

const apiRoutes = app.post('/api', zValidator('form', schema), (c) => {
  const { name } = c.req.valid('form')
  return c.json({ name })
})

export type ApiRoutes = typeof apiRoutes

export default app

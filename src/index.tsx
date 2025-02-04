import { Hono } from 'hono'
import { Script } from 'honox/server'

const app = new Hono()

app.get('/api', (c) => {
  return c.json({ message: 'Hello from server' })
})

app.get('/', (c) => {
  return c.html(
    <html>
      <head>
        <Script src="/src/client.tsx" prod={import.meta.env.PROD} />
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>
  )
})

export default app

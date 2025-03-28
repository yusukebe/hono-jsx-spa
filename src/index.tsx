import { Hono } from 'hono'
import { env } from 'cloudflare:workers'

const app = new Hono()

app.get('/api', (c) => {
  return c.json({ message: 'Hello from server' })
})

app.get('/', (c) => {
  return c.html(
    <html>
      <head>
        <script type="module" src={env.ENVIRONMENT === 'production' ? '/static/client.js' : '/src/client.tsx'}></script>
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>
  )
})

export default app

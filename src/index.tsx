import { Hono } from 'hono'

const app = new Hono()

app.get('/api', (c) => {
  return c.json({ message: 'Hello from server' })
})

app.get('/', (c) => {
  return c.html(
    <html>
      <head>
        <script type="module" src={import.meta.env.PROD ? '/assets/client.js' : '/src/client.tsx'}></script>
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>
  )
})

export default app

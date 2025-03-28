import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.get('/api', (c) => {
  return c.json({ message: 'Hello from server' })
})

app.use(renderer)

app.get('/', (c) => {
  return c.render(<div id="root"></div>)
})

export default app

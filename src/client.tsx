import { useState } from 'hono/jsx'
import { render } from 'hono/jsx/dom'
import { hc } from 'hono/client'
import type { ApiRoutes } from '.'

const client = hc<ApiRoutes>('/')

function App() {
  const [name, setName] = useState('no name')

  const fetchAction = async (formData: FormData) => {
    const res = await client.api.$post({
      form: {
        name: formData.get('name') ?? name
      }
    })
    const data = await res.json()
    setName(data.name)
  }

  return (
    <>
      <h1>Hello {name}!!</h1>
      <form action={fetchAction}>
        <input name="name" />
        <button type="submit">Send</button>
      </form>
    </>
  )
}

const domNode = document.getElementById('root')!
render(<App />, domNode)

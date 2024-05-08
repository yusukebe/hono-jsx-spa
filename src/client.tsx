import { render } from 'hono/jsx/dom'
import { useEffect, useState } from 'hono/jsx'
import { hc } from 'hono/client'
import { ApiType } from '.'

function App() {
  const [name, setName] = useState('')

  const client = hc<ApiType>('/')

  const fetchApi = async () => {
    const res = await client.api.$get()
    const data = await res.json()
    setName(data.name)
  }

  useEffect(() => {
    fetchApi()
  }, [])

  return <h1>Hello {name}!!</h1>
}

const domNode = document.getElementById('root')!
render(<App />, domNode)

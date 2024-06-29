import { useState } from 'hono/jsx'
import { render } from 'hono/jsx/dom'

function App() {
  const [name, setName] = useState('no name')

  const fetchAction = async (formData: FormData) => {
    const res = await fetch('/api', {
      method: 'POST',
      body: formData
    })
    const data = await res.json<{ name: string }>()
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

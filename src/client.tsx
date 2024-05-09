import { render } from 'hono/jsx/dom'
import useSWR from 'swr'

function App() {
  const fetcher = async (url: string) => {
    const res = await fetch(url)
    const data = await res.json<{ name: string }>()
    console.log(data) // {name: "Hono"}
    return data
  }

  const { data, error, isLoading } = useSWR('/api', fetcher)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return <h1>Hello {data?.name}!</h1>
}

const domNode = document.getElementById('root')!
render(<App />, domNode)

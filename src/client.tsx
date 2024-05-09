import { render } from 'hono/jsx/dom'
import { hc } from 'hono/client'
import useSWR from 'swr'
import { AppType } from '.'

function App() {
  const client = hc<AppType>('/')

  const fetcher = async () => {
    const res = await client.api.$get()
    return await res.json()
  }

  const { data, error, isLoading } = useSWR('/api', fetcher)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return <h1>Hello {data?.name}!</h1>
}

const domNode = document.getElementById('root')!
render(<App />, domNode)

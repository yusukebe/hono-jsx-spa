import { render, use, Suspense } from 'hono/jsx/dom'

const fetchData = async () => {
  const data = await fetch('/api')
  return data.json()
}

const Component = ({ promise }: { promise: Promise<{ message: string }> }) => {
  const data = use(promise)
  return <h1>{data.message}</h1>
}

const App = () => {
  return (
    <Suspense fallback={'loading...'}>
      <Component promise={fetchData()} />
    </Suspense>
  )
}

render(<App />, document.getElementById('root')!)

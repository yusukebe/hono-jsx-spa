import { use, Suspense } from 'react'

const fetchData = async () => {
  const data = await fetch('/api')
  return data.json<{ message: string }>()
}

const Component = ({ promise }: { promise: Promise<{ message: string }> }) => {
  const data = use(promise)
  return <h1 className="text-3xl font-bold underline">{data.message}</h1>
}

const App = () => {
  return (
    <Suspense fallback={'loading...'}>
      <Component promise={fetchData()} />
    </Suspense>
  )
}

export default App

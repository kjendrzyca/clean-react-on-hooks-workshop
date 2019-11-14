import React, {useEffect, useState} from 'react'

export const Counter = function({saveCounterLocally, getInitialCounter, persistCounter}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    saveCounterLocally(count)
  }, [count, saveCounterLocally])

  useEffect(() => {
    persistCounter(count)
  }, [count, persistCounter])

  useEffect(() => {
    const get = async () => {
      const result = await getInitialCounter()

      setCount(result)
    }

    get()
  }, [getInitialCounter])

  return <div>
    <p>{count}</p>
    <button onClick={() => setCount(count + 1)}>count</button>
  </div>
}

import React, {useState, useContext} from 'react'

const CounterContext = React.createContext()

const ContextAwareCounter = function() {
  const [count, setCount] = useState(0)
  const modifierFunction = useContext(CounterContext)

  return <div>
    <p>{count}</p>
    <button onClick={() => setCount(modifierFunction)}>count</button>
  </div>
}

export { ContextAwareCounter, CounterContext }

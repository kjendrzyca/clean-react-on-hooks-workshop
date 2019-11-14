import React, {useState, useContext} from 'react'

// initialize react context, with incrementation as default value
const CounterContext = null

const ContextAwareCounter = function() {
  // instructions:
  // take the state transition from context (useContext)
  // use context function to change the counter state

  // you should consider: [someState, setSomeState] = useState() hook
  // hint: there is an other way to call the useState hook...

  return <div>
    <p>{/* count here */}</p>
    <button onClick={() => {/* handler here */}}>count</button>
  </div>
}

export { ContextAwareCounter, CounterContext }

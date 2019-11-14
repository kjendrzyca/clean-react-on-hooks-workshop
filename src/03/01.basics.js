import React, {useEffect, useState} from 'react'

export const Counter = function({saveCounterLocally, getInitialCounter, persistCounter}) {
  // your Counter implementation(s) here

  return <div>
    <p>{/* count here */}</p>
    <button onClick={() => {/* handler here */}}>count</button>
  </div>
}

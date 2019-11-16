import React, {useState, useEffect} from 'react'

const artificialDelays = {
  item0: 2,
  item1: 2000,
  item2: 200,
}

const descriptions = {
  item0: 'This is a description for item0, fetching it takes 2 milliseconds',
  item1: 'This is a description for item1, fetching it takes 2 seconds',
  item2: 'This is a description for item2, fetching it takes 200 milliseconds',
}

const getAfter = ({delay, returnValue}) => new Promise(resolve => {
  setTimeout(() => resolve(returnValue), delay)
})

// TODO Change the useEffect hook implementation to ignore state update of earlier response if a new request was made.

function Solution ({itemId}) {
  const [loading, setLoading] = useState(true)
  const [description, setDescription] = useState()

  useEffect(() => {
    let ignoreRequest = false
    setLoading(true)

    const get = async () => {
      // asynchronous operation that takes time
      const data = await getAfter({delay: artificialDelays[itemId], returnValue: descriptions[itemId]})

      if (ignoreRequest) {
        return
      }

      setDescription(data)
      setLoading(false)
    }

    get()

    return () => {
      ignoreRequest = true
    }
  }, [itemId])

  if (loading) {
    return <p>loading...</p>
  }

  return <p>{description}</p>
}

// initial
export default function () {
  const [itemId, setItem] = useState("item0")

  return <>
    <Solution itemId={itemId} />
    <button onClick={() => setItem("item0")}>item 0</button>
    <button onClick={() => setItem("item1")}>item 1 - 2 seconds</button>
    <button onClick={() => setItem("item2")}>item 2 - 200 milliseconds</button>
  </>
}

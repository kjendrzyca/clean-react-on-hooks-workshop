import React, {useEffect, useState} from 'react'

// you'll learn:
// managing hook dependencies and reducing them by passing function to setState
// how to achieve persistent reference to a mutable variable in function component


// TODO Create only one interval in the browser, when the timer is mounted and that is cleaned up when the timer is unmounted (you can unmount/mount using the `toggle timer rendering` button)
// TODO Create a "stop timer" button, that clears the interval and just renders the last state of the timer.

// initial
export default function () {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    console.log('interval effect')
    const id = setInterval(() => {
      console.log('running interval', id)
      setSeconds(seconds + 1)
    }, 1000);

    return () => {
      console.log('cleaning interval', id)
      clearInterval(id);
    };
  }, [seconds]);

  return (
    <>
      <p>{seconds}s</p>
    </>
  )
}

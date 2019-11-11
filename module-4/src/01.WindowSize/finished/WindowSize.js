import React from 'react';

function useWindowSize() {
  const getSize = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const [size, setSize] = React.useState(getSize)

  React.useEffect(() => {
    const handleResize = () => setSize(getSize())

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [getSize]) // 👈 Run only on mount and unmount

  return size
}

export default function WindowSize() {
  const windowSize = useWindowSize()

  return (
    <div>
      {windowSize.width} x {windowSize.height}
    </div>
  )
}

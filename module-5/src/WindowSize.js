import React from 'react';

const getSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
})

export function useWindowSize() {
  const [size, setSize] = React.useState(getSize)

  React.useEffect(() => {
    const handleResize = () => setSize(getSize())

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []) // 👈 Run only on mount and unmount

  return size
}

export default function WindowSize() {
  const windowSize = useWindowSize()

  return (
    <div className="window-size">
      {windowSize.width}x{windowSize.height}
    </div>
  )
}

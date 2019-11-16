// 👉 Hook example:
import React from 'react'

function HookExample() {
  const [count, setCount] = React.useState(0);
  const onClickHandler = React.useCallback(
    () => setCount(count + 1),
    [count],
  )

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={onClickHandler}>
        Click me
      </button>
    </div>
  );
}


// Available now. Hooks are now available with the release of v16.8.0.


// Completely opt-in. You can try Hooks in a few components without rewriting any existing code.
// But you don’t have to learn or use Hooks right now if you don’t want to.


// 100% backwards-compatible. Hooks don’t contain any breaking changes.

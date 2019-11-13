// 👉 Class example:

class ClassExample extends React.Component {
  state = { count: 0 }

  render() {
    return (
      <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setState(({ count }) => ({ count: count + 1 }))}>
        Click me
      </button>
    </div>
    )
  }
}

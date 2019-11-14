// this is how you can wrap rendering the hook and keep it clean
// const renderTheHook = (initialValue = '') => {
//   const {result, rerender} = renderHook(
//     props => useUndoableState(props), { initialProps: initialValue }
//   )

//   return {
//     getValue: () => result.current[0],
//     setValue: value => result.current[1](value),
//     undo: () => result.current[2](),
//     reset: () => result.current[3](),
//     rerender,
//   }
// }

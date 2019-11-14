// this is how you can wrap rendering the hook and keep it clean
// const renderTheHook = () => {
//   const {result} = renderHook(() => useUndoableState(''))
//   return {
//     getValue: () => result.current[0],
//     setValue: value => result.current[1](value),
//     undo: () => result.current[2](),
//   }
// }

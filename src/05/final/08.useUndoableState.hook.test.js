import {renderHook, act} from '@testing-library/react-hooks'
import {useUndoableState} from '../Editor'

jest.useFakeTimers()

const runAllTimers = () => act(() => jest.runAllTimers())

describe.skip(`useUndoableState`, () => {
  it(`should return initial value`, () => {
    // given
    const initialValue = '';

    // when
    const {result} = renderHook(() => useUndoableState(initialValue))

    // then
    const [value] = result.current
    expect(value).toEqual(initialValue)
  })

  it(`should set value`, () => {
    // given
    const {result} = renderHook(() => useUndoableState(''))
    const [,setValue] = result.current
    const newValue = 'asdf'

    // when
    act(() => {
      setValue(newValue)
    })

    // then
    const [value] = result.current
    expect(value).toEqual(newValue)
  })

  it(`should undo when the value was changed once`, () => {
    // given
    const initialValue = ''
    const {result} = renderHook(() => useUndoableState(initialValue))
    const [,setValue, undo] = result.current
    act(() => {
      setValue('asdf')
    })
    runAllTimers();

    // when
    act(() => {
      undo()
    })

    // then
    const [value] = result.current
    expect(value).toEqual(initialValue)
  })

  const renderTheHook = (initialValue = '') => {
    const {result, rerender} = renderHook(
      props => useUndoableState(props), { initialProps: initialValue }
    )

    return {
      getValue: () => result.current[0],
      setValue: value => result.current[1](value),
      undo: () => result.current[2](),
      reset: () => result.current[3](),
      rerender,
    }
  }

  it(`should undo when the value was changed twice`, () => {
    // given
    const {getValue, setValue, undo} = renderTheHook()

    act(() => {
      setValue('asdf')
    })
    runAllTimers();
    act(() => {
      setValue('asdf blah')
    })
    runAllTimers();

    // when
    act(() => {
      undo()
    })

    // then
    expect(getValue()).toEqual('asdf')
  })

  it(`should work when trying to undo what's undoable`, () => {
    // given
    const initialValue = ''
    const {getValue, undo} = renderTheHook(initialValue)

    // when
    act(() => {
      undo()
    })

    // then
    expect(getValue()).toEqual(initialValue)
  })

  it(`should reset value`, () => {
    // given
    const initialValue = ''
    const {getValue, setValue, reset} = renderTheHook(initialValue)

    act(() => {
      setValue('asdf')
    })
    runAllTimers();

    // when
    act(() => {
      reset()
    })

    // then
    expect(getValue()).toEqual(initialValue)
  })

  it(`should reset value to updated initial value`, () => {
    // given
    const initialValue = ''
    const newInitialValue = 'hello there'
    const {getValue, reset, rerender} = renderTheHook(initialValue)

    // when
    rerender(newInitialValue)
    act(() => {
      reset()
    })

    // then
    expect(getValue()).toEqual(newInitialValue)
  })
})

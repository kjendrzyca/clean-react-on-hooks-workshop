import {renderHook, act} from '@testing-library/react-hooks'
import {useUndoableState} from './Editor'

jest.useFakeTimers()

const runAllTimers = () => act(() => jest.runAllTimers())

describe(`useUndoableState`, () => {
  it(`should return initial value`, () => {
    // given
    const initialValue = '';

    // when
    // rendering hook

    // then
    // hook value is equal intial value
  })

  it(`should set value`, () => {
    // given
    // hook is rendered with initial value
    // new value

    // when
    // setting new value

    // then
    // hook value is equal new value
  })

  it(`should undo when the value was changed once`, () => {
    // given
    // hook is rendered with initial value
    // you set value once
    // time is passing by :)

    // when
    // calling undo

    // then
    // hook value is equal initial value
  })

  // IMPORTANT: ask me for advice if you reached this point

  it(`should undo when the value was changed twice`, () => {
    // given
    // hook is rendered with this shiny, custom renderer
    // you set value once
    // time is passing by :)
    // you set value again
    // time is passing by :)

    // when
    // calling undo

    // then
    // hook value is equal previous value
  })

  it(`should work when trying to undo what's undoable`, () => {
    // given
    // hook is rendered with initial value

    // when
    // calling undo

    // then
    // hook value is equal initial value
  })
})

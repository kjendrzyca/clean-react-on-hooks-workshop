import React from 'react'
import {render, wait, fireEvent} from '@testing-library/react'

const BUTTON_TEXT = 'count'

const Counter = function({saveCounterLocally, getInitialCounter, persistCounter}) {
  // your Counter implementation(s) here
  return <div>
    <p></p>
    <button>count</button>
  </div>
}

describe(`Counter`, () => {
  // you should consider: [someState, setSomeState] = useState() hook
  it(`should render button for counting and initial counter state`, () => {
    // given
    const expectedInitialState = 0;

    // when
    const {getByText} = render(<Counter saveCounterLocally={() => null} getInitialCounter={() => Promise.resolve(0)} persistCounter={() => null}/>)

    // then
    expect(getByText(expectedInitialState.toString())).not.toEqual(null)
    expect(getByText(BUTTON_TEXT)).not.toEqual(null)
  })

  it(`should increment the count when clicking on button`, () => {
    // given
    const expectedCounterState = 2;
    const {getByText} = render(<Counter saveCounterLocally={() => null} getInitialCounter={() => Promise.resolve(0)} persistCounter={() => null}/>)

    // when
    fireEvent.click(getByText(BUTTON_TEXT))
    fireEvent.click(getByText(BUTTON_TEXT))

    // then
    expect(getByText(expectedCounterState.toString())).not.toEqual(null)
  })

  // you should consider using `useEffect`hook
  // otherwise the first state of 0 will not be saved
  it(`should run a side effect on each counter incrementation`, () => {
    // given
    const synchronousSideEffect = jest.fn()
    const {getByText} = render(<Counter saveCounterLocally={synchronousSideEffect} getInitialCounter={() => Promise.resolve(0)} persistCounter={() => null}/>)

    // when
    fireEvent.click(getByText(BUTTON_TEXT))

    // then
    expect(synchronousSideEffect.mock.calls.length).toEqual(2)
    expect(synchronousSideEffect.mock.calls[0][0]).toEqual(0)
    expect(synchronousSideEffect.mock.calls[1][0]).toEqual(1)
  })

  // hint: useEffect hook with empty dependency array 'acts as' componentDidMount
  it(`should get initial state data once, asynchronously`, async () => {
    // given
    const expectedInitialState = 3
    const getInitialCounter = jest.fn().mockImplementationOnce(() => Promise.resolve(expectedInitialState))
    const {getByText} = render(<Counter saveCounterLocally={() => null} getInitialCounter={getInitialCounter} persistCounter={() => null}/>)

    // when
    fireEvent.click(getByText(BUTTON_TEXT))

    // then
    await wait(() => expect(getByText(expectedInitialState.toString())).not.toEqual(null))
    expect(getInitialCounter.mock.calls.length).toEqual(1)
  })

  // hint: same as synchronous effect, hooks do not care, they fire side effects
  it(`should persist data when count changes`, async () => {
    // given
    const expectedState = 2
    const persistCounter = jest.fn().mockImplementationOnce(() => Promise.resolve())
    const {getByText} = render(<Counter saveCounterLocally={() => null} getInitialCounter={() => Promise.resolve(0)} persistCounter={persistCounter} />)

    // when
    fireEvent.click(getByText(BUTTON_TEXT))
    fireEvent.click(getByText(BUTTON_TEXT))

    // then
    expect(getByText(expectedState.toString())).not.toEqual(null)
    expect(persistCounter.mock.calls.length).toEqual(3)
    expect(persistCounter.mock.calls[0][0]).toEqual(0)
    expect(persistCounter.mock.calls[1][0]).toEqual(1)
    expect(persistCounter.mock.calls[2][0]).toEqual(2)
  })
})

// TODO: BONUS ROUND:
// reqrite the Counter component to use `useReducer`hook instead of `useState`

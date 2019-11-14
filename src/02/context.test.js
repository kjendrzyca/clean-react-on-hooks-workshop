import React from 'react'
import {render, fireEvent} from '@testing-library/react'

const BUTTON_TEXT = 'count'

const increment = state => state + 1
const decrement = state => state - 1

// initialize react context, with incrementation as default value
const CounterContext = null

const ContextAwareCounter = function() {
  // instructions:
  // take the state transition from context (useContext)
  // use context function to change the counter state
  //
  // return <div>
    // <p></p>
    // <button></button>
  // </div>

  return <div>
    <p></p>
    <button>count</button>
  </div>
}

describe(`ContextAwareCounter`, () => {
  // you should consider: [someState, setSomeState] = useState() hook
  it(`should increment the count when clicking on button`, () => {
    // given
    const expectedCounterState = 2;
    const {getByText} = render(<CounterContext.Provider value={increment}>
      <div className="any">
        <div className="number">
          <div className="of">
            <div className="nested">
              <div className="components">
                <ContextAwareCounter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CounterContext.Provider>)

    // when
    fireEvent.click(getByText(BUTTON_TEXT))
    fireEvent.click(getByText(BUTTON_TEXT))

    // then
    expect(getByText(expectedCounterState.toString())).not.toEqual(null)
  })

  it(`should decrement the count when clicking on button`, () => {
    // given
    const expectedCounterState = -2;
    const {getByText} = render(<CounterContext.Provider value={decrement}>
      <div className="any">
        <div className="number">
          <div className="of">
            <div className="nested">
              <div className="components">
                <ContextAwareCounter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CounterContext.Provider>)

    // when
    fireEvent.click(getByText(BUTTON_TEXT))
    fireEvent.click(getByText(BUTTON_TEXT))

    // then
    expect(getByText(expectedCounterState.toString())).not.toEqual(null)
  })
})

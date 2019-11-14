import {renderHook, act} from '@testing-library/react-hooks'
import {fireEvent} from '@testing-library/react'
import {useWindowSize} from './WindowSize'

describe.skip(`useWindowSize`, () => {
  it(`should return with default resolution`, () => {
    // given
    const DEFAULT_DOM_RESOLUTION = [1024, 768]
    // desctructuring can break your spirit 👻

    // when
    // rendering hook

    // then
    // [width, height] is equal DEFAULT_DOM_RESOLUTION
    // and there are no errors
  })

  it(`should return changed resolution when resizing`, () => {
    // given
    const newWidth = 1000;
    const newHeight = 800
    // hook is rendered

    // when
    // firing window resize event

    // then
    // [width, height] is equal [newWidth, newHeight]
  })

  it(`should subscribe and unsubscribe to the 'resize' event only once`, () => {
    // given
    const addSpy = jest.spyOn(window, 'addEventListener')
    const removeSpy = jest.spyOn(window, 'removeEventListener')
    // hook is rendered

    // when
    // rerendering hook
    // unmounting hook

    // then
    // number of resize calls for add listener === 1
    // number of resize calls for remove listener === 1
  })
})

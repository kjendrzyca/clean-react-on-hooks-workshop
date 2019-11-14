import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import WindowSize from '../WindowSize'

describe(`WindowSize`, () => {
  it(`should render with default resolution`, () => {
    // given
    const DEFAULT_DOM_RESOLUTION = '1024x768'

    // when
    const {getByText} = render(<WindowSize />)

    // then
    expect(getByText(DEFAULT_DOM_RESOLUTION)).not.toEqual(null)
  })

  it(`should render with changed resolution when resizing`, () => {
    // given
    const newWidth = 1000;
    const newHeight = 800
    const resolution = `${newWidth}x${newHeight}`

    // when
    const {getByText} = render(<WindowSize />)
    window.innerWidth = newWidth
    window.innerHeight = newHeight
    fireEvent(window, new Event('resize'))

    // then
    expect(getByText(resolution)).not.toEqual(null)
  })
})

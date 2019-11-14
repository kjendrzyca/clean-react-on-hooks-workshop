import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import WindowSize from './WindowSize'

describe.skip(`WindowSize`, () => {
  it(`should render with default resolution`, () => {
    // given
    const DEFAULT_DOM_RESOLUTION = '1024x768'

    // when
    // rendering WindowSize
    // you search by default resolution text

    // then
    // the element is there

    // and there are diffrent kinds of api you could use (if you didn't know already)
    // https://testing-library.com/docs/react-testing-library/cheatsheet
  })

  it(`should render with changed resolution when resizing`, () => {
    // given
    const newWidth = 1000;
    const newHeight = 800
    const resolution = `${newWidth}x${newHeight}`
    // WindowSize is rendered

    // when
    // firing window resize event
    // when you search by new resolution text

    // then
    // the element is there
  })
})

// REMINDER: learn how to `act`

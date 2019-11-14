import React from 'react'
import {render, fireEvent, act} from '@testing-library/react'
import Editor from './Editor'

jest.useFakeTimers()

const runAllTimers = () => act(() => jest.runAllTimers())

// how to fire events: https://testing-library.com/docs/dom-testing-library/api-events
// https://github.com/testing-library/dom-testing-library/blob/master/src/events.js

describe(`Editor`, () => {
  it(`should change textarea value`, () => {
    // given
    const newValue = 'Something new'
    // Editor is rendered

    // when
    // searching textarea by placeholder
    // firing change event on the textarea with new value

    // then
    // text area innerHTML is equal new value
  })

  it(`should undo the change on textarea value`, async () => {
    // given
    const newValue = 'Something new'
    const secondNewValue = 'Something new entirely'

    // Editor is rendered
    // searching textarea by placeholder
    // firing change event on the textarea with new value
    // time is passing by :)

    // firing change event on the textarea with second new value
    // time is passing by :)

    // when
    // searching undo button by text
    // clicking undo button

    // then
    // text area innerHTML is equal new value
  })
})

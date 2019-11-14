import React from 'react'
import {render, fireEvent, act} from '@testing-library/react'
import Editor from './Editor'

jest.useFakeTimers()

const runAllTimers = () => act(() => jest.runAllTimers())

describe(`Editor`, () => {
  it(`should change textarea value`, () => {
    // given
    const newValue = 'Something new'

    // when
    const {getByPlaceholderText} = render(<Editor />)
    const textArea = getByPlaceholderText('Write something')
    fireEvent.change(textArea, { target: { value: newValue } })

    // then
    expect(textArea.innerHTML).toEqual(newValue)
  })

  it(`should undo the change on textarea value`, async () => {
    // given
    const newValue = 'Something new'
    const secondNewValue = 'Something new entirely'

    const {getByPlaceholderText, getByText} = render(<Editor />)
    const textArea = getByPlaceholderText('Write something')
    fireEvent.change(textArea, { target: { value: newValue } })
    runAllTimers()

    fireEvent.change(textArea, { target: { value: secondNewValue } })
    runAllTimers()

    // when
    const undoButton = getByText('Undo')
    fireEvent.click(undoButton)

    // then
    expect(textArea.innerHTML).toEqual(newValue)
  })
})

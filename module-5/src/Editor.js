import React from 'react'

export function useUndoableState(initialValue, delay = 500) {
  const [value, setValue] = React.useState(initialValue)

  const [history, setHistory] = React.useState([])

  const undo = () => {
    const returnPoint = history[1]
    setValue(returnPoint || '')
    setHistory(history.slice(1))
  }

  const shouldSetNewValue = history[0] !== value

  React.useEffect(() => {
    if (!value.length || !shouldSetNewValue) {
      return
    }
    const handler = setTimeout(() => {
      setHistory(oldHistory => [value, ...oldHistory])
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [delay, shouldSetNewValue, value])

  return [value, setValue, undo]
}

export default function Editor() {
  const [body, setBody, undo] = useUndoableState('')

  const changeBody = event => setBody(event.target.value)
  const submitForm = () => alert(JSON.stringify({ body }))

  return (
    <div className="editor">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">

            <form>
              <fieldset className="form-group">
                <textarea
                  className="form-control"
                  rows="8"
                  placeholder="Write something"
                  value={body}
                  onChange={changeBody}>
                </textarea>
              </fieldset>

              <button
                className="btn btn-lg btn-secondary mr-2"
                type="button"
                onClick={undo}>
                Undo
              </button>

              <button
                className="btn btn-lg btn-primary"
                type="button"
                onClick={submitForm}>
                Publish
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

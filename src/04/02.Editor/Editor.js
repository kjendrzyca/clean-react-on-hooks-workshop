import React from 'react'

// 👉 Todo: implement the useUndoableState hook.
// You need to debounce the the change handler, this is how you debounce:

// const handler = setTimeout(() => {
//   // do something...
// }, delay)
// clearTimeout(handler) // <- cleanup

function useUndoableState(initialValue, delay = 500) {

  React.useEffect(() => {

  }, [])

  // 👉 Uncomment when ready:
  // return [value, setValue, undo]
}

export default function Editor() {
  const [body, setBody] = React.useState('')
  // 👉 Replace the above with:
  // const [body, setBody, undo] = React.useUndoableState('')

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

              {/* 👉 Uncomment when ready: */}
              {/* <button
                className="btn btn-lg btn-secondary mr-2"
                type="button"
                onClick={undo}>
                Undo
              </button> */}

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

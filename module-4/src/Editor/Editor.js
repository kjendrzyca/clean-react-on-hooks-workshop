import React from 'react'

export default function Editor() {
  const [body, setBody] = React.useState('')

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
                className="btn btn-lg pull-xs-right btn-primary"
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

// 💡 OCP
// High-level stuff: displaying the UI and markup
// Low-level stuff: location, settings, ...
// Protect high-level stuff from changes in low-level stuff
// If component A should be protected from changes in component B, then component B should depend on component A

const numeralJs = format => number => formatNumber(format, number)

// Responsibility: provide the correct markup for the number
function NumberFormatter({ format, number }) {
  return (
    <div>
      {numeralJs(format)(number)}
    </div>
  )
}

function SimpleComponent({ number }) {
  return (
    <div>
      The number is: <br />
      <NumberFormatter format={'0.000'} number={number} />
    </div>
  )
}

// !!! Requirement change: if the country is US we need to insert commas !!!
// Before: 10000.000
// After: 10,000.000

// Solution:
function NumberFormatter({ format, number }) {
  const adjustedFormat = checkIfUS() ? `0,${format}` : format // 0,0.000

  return (
    <div>
      {numeralJs(adjustedFormat)(number)}
    </div>
  )
}

// !!! Requirement change: if the `display negatives in parenthesis` in the settings is set !!!
// !!! then negatives should be displayed in parenthesis !!!
// Before: -10000.000
// After: (10000.000)
// Before: -10,000.000
// After: (10,000.000)

// Solution (probably breaking OCP, but who knows):
const mapStateToProps = state => ({
  displayNegativesInParenthesis: state.settings.displayNegativesInParenthesis,
})

connect(mapStateToProps)(
  function NumberFormatter({ format, number, displayNegativesInParenthesis }) {
    const locationAdjustedFormat = checkIfUS() ? `0,${format}` : format // 0,0.000

    const settingsAdjustedFormat = displayNegativesInParenthesis
      ? `(${locationAdjustedFormat})` // (0,0.000)
      : locationAdjustedFormat

    return (
      <div>
        {numeralJs(settingsAdjustedFormat)(number)}
      </div>
    )
  }
)

// !!! Requirement change: if we are on the `/shop/dinosaur-toys` route we should paint the numbers green !!!

// Solution (probably breaking OCP, but who knows):
const mapStateToProps = state => ({
  displayNegativesInParenthesis: state.settings.displayNegativesInParenthesis,
})

connect(mapStateToProps)(
  withRouter(
    function NumberFormatter({
      format,
      number,
      displayNegativesInParenthesis,
      location, // <- this is new
    }) {
      const locationAdjustedFormat = checkIfUS() ? `0,${format}` : format // 0,0.000

      const settingsAdjustedFormat = displayNegativesInParenthesis
        ? `(${locationAdjustedFormat})` // (0,0.000)
        : locationAdjustedFormat

      const className = classnames({
        red: location.pathname.includes('dinosaur-toys')
      })

      return (
        <div className={className}>
          {numeralJs(settingsAdjustedFormat)(number)}
        </div>
      )
    }
  )
)

// Solution (probably better in terms of OCP):

// 1.
// adjustFormatting is the key here.
// Thanks to that the NumberFormatter is closed for modification (at least for now)
// and open for extension - just pass the `adjustFormatting` function however you like and you are fine
function NumberFormatter({
  format,
  number,
  adjustFormatting,
  className,
}) {
  const adjustedFormat = adjustFormatting(format)
  return (
    <div className={className}>
      {numeralJs(adjustedFormat)(number)}
    </div>
  )
}

// 2.
const mapStateToProps = state => ({
  displayNegativesInParenthesis: state.settings.displayNegativesInParenthesis,
})

function withAdjustedFormatting(ComponentToWrap) {
  function LocalizedFormatter({ displayNegativesInParenthesis, ...restProps }) {
    const locationAdjustedFormat = format => checkIfUS() ? `0,${format}` : format // 0,0.000
    const settingsAdjustedFormat = format => displayNegativesInParenthesis
      ? `(${format})` // (0,0.000)
      : format

    const adjustFormatting = format => settingsAdjustedFormat(locationAdjustedFormat(format))

    return <ComponentToWrap {...restProps} adjustFormatting={adjustFormatting} />
  }

  return connect(mapStateToProps)(LocalizedFormatter)
}

// 3.
const AdjustedNumberFormatter = withAdjustedFormatting(NumberFormatter)

// 4. usage:
function SimpleComponent({ number, location }) {
  return (
    <div>
      The number is: <br />
      {/* <NumberFormatter format={'0.000'} number={number} /> */}
      <AdjustedNumberFormatter
        format={'0.000'}
        number={number}
        className={getClassnameBasedOnLocation(location)}
      />
    </div>
  )
}


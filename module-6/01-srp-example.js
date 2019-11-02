// SRP

// Responsibility: formats the number as a string
const numeralJs = format => number => formatNumber(format, number)

// Responsibility: provide the correct markup for the number - displays the number in a div
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
// Input:
// <SimpleComponent number={0} />
//
// Output:
// The number is:
// 0.000

function ComponentWithPicture({ number }) {
  return (
    <div>
      <img src="/img/the-number-is.jpg" /><br />
      <NumberFormatter format={'0'} number={number} />
    </div>
  )
}
// Input:
// <ComponentWithPicture number={0} />
//
// Output:
// <the number is picture>
// 0

// !!! Requirement change: if the number is 0, the NumberFormatter should have `is-zero` class assigned. !!!

// We should ask the important question: what actor requested the change?

// Solution 1 (wrong):
function NumberFormatter({ format, number }) {
  const className = classnames({ 'is-zero': number === 0 })
  return (
    <div className={className}>
      {numeralJs(format)(number)}
    </div>
  )
}

// Solution 2 (right):
function SimpleComponent({ number }) {
  return (
    <div>
      The number is: <br />
      <NumberFormatter format={'0.000'} number={number} additionalClassName={classnames({ 'is-zero': number === 0 })} />
    </div>
  )
}
function NumberFormatter({ format, number, additionalClassName }) {
  return (
    <div className={additionalClassName}>
      {numeralJs(format)(number)}
    </div>
  )
}
NumberFormatter.defaultProps = { additionalClassName: '' }

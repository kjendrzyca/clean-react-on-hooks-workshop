// 💡 DIP

import numeralJs from 'numeraljs'

function SimpleComponent({ number }) {
  return (
    <div>
      The number is: <br />
      {numeralJs('0.000')(number)}
    </div>
  )
}

// better

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

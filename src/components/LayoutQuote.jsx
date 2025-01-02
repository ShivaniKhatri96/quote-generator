import React from 'react'

const LayoutQuote = ({quote}) => {
  return (
    <div>
    <div>{quote?.text}</div>
    <div>- {quote?.author}</div>
  </div>
  )
}

export default LayoutQuote
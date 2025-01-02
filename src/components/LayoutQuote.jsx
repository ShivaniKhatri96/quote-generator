import React from 'react'

const LayoutQuote = ({quote}) => {
  return (
    <div>
    <div>{quote?.text}</div>
    <div>- {quote?.author}</div>
    <button>Fav</button>
  </div>
  )
}

export default LayoutQuote
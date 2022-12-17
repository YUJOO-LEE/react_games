import React, { memo } from 'react'

const Ball = memo(({number}) => {
  return (
    <div>{number}</div>
  )
})

export default Ball;
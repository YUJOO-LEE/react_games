import React from 'react';

function Try({count, value, score}) {
  return (
    <li>{count} 번째 시도 : [{value}] {score}</li>
  )
}

export default Try;
import React, { memo } from 'react';

const Try =  memo(({count, value, score}) => {
  return (
    <li>{count} 번째 시도 : [{value}] {score}</li>
  )
});
Try.displayName = 'Try';

export default Try;
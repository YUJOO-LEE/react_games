import React, { memo } from 'react';

const RenderResult = memo(({ result }) => {
  const average = Math.floor(result.reduce((a, c) => a + c) / result.length);

  return (
    <>
      <p>평균 시간 : {average} ms</p>
      <ul>{result.map(time => 
        <li key={'time' + time}>{time}ms</li>
      )}</ul>
    </>
  )
});

export default RenderResult;
import React, { useEffect, useRef, useState } from 'react';

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
}

const RPS = () => {
  const [Computer, setComputer] = useState('');
  const [Result, setResult] = useState('');
  const game = useRef(null);

  const handleClick = (selected) => () => {
    clearInterval(game.current);
    const diff = scores[selected] - scores[Computer];
    if (diff === 0) {
      setResult('비겼습니다.');
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다.');
    } else {
      setResult('졌습니다.');
    }
  }

  useEffect(() => {
    game.current = setInterval(()=>{
      setComputer(prev => {
        if (prev === '가위') return '바위'
        else if (prev === '바위') return '보'
        else return '가위';
      });
    }, 100);

    return () => {
      clearInterval(game.current);
    };
  }, [])

  return (
    <div>
      <div className='computer'>
        {Computer}
      </div>
      <div className='user'>
        <button onClick={handleClick('가위')}>가위</button>
        <button onClick={handleClick('바위')}>바위</button>
        <button onClick={handleClick('보')}>보</button>
      </div>
      <p>{Result}</p>
    </div>
  )
}

export default RPS;
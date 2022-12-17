import React, { useEffect, useMemo, useRef, useState } from 'react';
import Ball from './ball';

const getWinNumbers = () => {
  const candidate = Array(45).fill().map((_, i) => i + 1);
  const shuffle = [];
  while (shuffle.length < 7) {
    const randomNum = Math.floor(Math.random() * candidate.length);
    shuffle.push(candidate.splice(randomNum, 1)[0]);
  }
  console.log('this'+shuffle);
  return shuffle;
}

const Lotto = () => {
  const WinNumbers = useMemo(() => getWinNumbers(), []);
  const [WinBalls, setWinBalls] = useState([]);
  const [Bonus, setBonus] = useState(null);
  const timer = useRef([]);

  useEffect(() => {
    for (let i = 0; i < 6; i++) {
      timer.current[i] = setTimeout(()=>{
          setWinBalls(prev => [...prev, WinNumbers[i]]);
        }, 1000 * (i + 1));
    }
    
    timer.current[6] = setTimeout(()=>{
        setBonus(WinNumbers[WinNumbers.length - 1]);
      }, 1000 * 7);

    return () => {
      for (let i = 0; i < timer.current.length; i++) {
        clearTimeout(timer.current[i]);
      }
    }
  }, []);

  return (
    <>
      <div>Lotto</div>
      <div>
        {WinBalls.map(v => 
          <Ball key={'number' + v} number={v} />
        )}
        {Bonus && 
          <Ball key={'number' + Bonus} number={Bonus} />
        }
      </div>
    </>
  )
}

export default Lotto;
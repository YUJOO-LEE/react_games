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
  const winNumbers = shuffle.slice(0, 6).sort((a, b) => a - b);
  const bonusNumber = shuffle[shuffle.length - 1];
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  const WinNumbers = useMemo(() => getWinNumbers(), []);
  const [WinBalls, setWinBalls] = useState([]);
  const [Bonus, setBonus] = useState(null);
  const timer = useRef([]);

  useEffect(() => {
    for (let i = 0; i < WinNumbers.length; i++) {
      if (i < 6) {
        timer.current[i] = setTimeout(()=>{
          setWinBalls(prev => [...prev, WinNumbers[i]]);
        }, 1000 * (i + 1));
      } else {
        timer.current[i] = setTimeout(()=>{
          setBonus(WinNumbers[i]);
        }, 1000 * (i + 1));
      }
    }

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
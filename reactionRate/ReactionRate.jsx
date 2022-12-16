import React, { useRef, useState } from 'react'
import RenderResult from './RenderResult';

const STATE_TYPE = {
  WAITING: {id: 'waiting', message: '클릭해서 시작하세요.'},
  START: {id: 'start', message: '초록색으로 바뀌면 클릭하세요.'},
  CLICK: {id: 'click', message: '클릭!'},
  ERROR: {id: 'error', message: '성급하시네요!'}
}

const ReactionRate = () => {
  const [State, setState] = useState(STATE_TYPE.WAITING);
  const [Result, setResult] = useState([]);
  const setTimer = useRef(null);
  const startTime = useRef(null);

  const timer = () => {
    setState(STATE_TYPE.CLICK);
    startTime.current = new Date();
  }

  const handleClick = () => {
    if (State.id === 'waiting') {
      setState(STATE_TYPE.START);
      setTimer.current = setTimeout(timer, Math.random() * 3000 + 1000);
    } else if (State.id === 'start') {
      setState(STATE_TYPE.ERROR);
      clearTimeout(setTimer.current);
    } else if (State.id === 'click') {
      const curDate = new Date();
      const time = curDate - startTime.current;
      setResult(prev => [...prev, time]);
      setState(STATE_TYPE.WAITING);
    } else if (State.id === 'error') {
      setState(STATE_TYPE.WAITING);
    }
  }

  return (
    <>
      <div
        className={State.id}
        onClick={handleClick}
      >
        {State.message}
      </div>
      {Result.length > 0 &&
        <RenderResult result={Result} />
      }
    </>
  )
}

export default ReactionRate
import React, { useState } from 'react'

let setTimer;
const STATE_TYPE = {
  WAITING: {id: 'waiting', message: '클릭해서 시작하세요.', startTime: null},
  START: {id: 'start', message: '초록색으로 바뀌면 클릭하세요.', startTime: null},
  CLICK: {id: 'click', message: '클릭!'},
  ERROR: {id: 'error', message: '성급하시네요!', startTime: null}
}

const ReactionRate = () => {
  const [State, setState] = useState(STATE_TYPE.WAITING);
  const [Result, setResult] = useState([]);

  const timer = () => {
    setState({...STATE_TYPE.CLICK, startTime: new Date});
  }

  const handleClick = () => {
    if (State.id === 'waiting') {
      setState(STATE_TYPE.START);
      setTimer = setTimeout(timer, Math.random() * 5 + 1000);
    } else if (State.id === 'start') {
      setState(STATE_TYPE.ERROR);
      clearTimeout(setTimer);
    } else if (State.id === 'click') {
      const curDate = new Date;
      const time = curDate - State.startTime;
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
        <>
        <p>평균 시간 : {Math.floor(Result.reduce((a, c) => a + c) / Result.length)} ms</p>
        <ul>{Result.map(time => <li key={'time' + time}>{time}ms</li>)}</ul>
        </>
      }
    </>
  )
}

export default ReactionRate
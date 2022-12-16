import React, { useEffect, useState } from 'react';

function BaseBall() {
  const [Answer, setAnswer] = useState([]);
  const [Result, setResult] = useState('');
  const [Value, setValue] = useState('');
  const [Log, setLog] = useState([]);
  const [Error, setError] = useState('');
  
  const onInput = (e) => {
    setValue(e.target.value);
  }

  const clearGame = () => {
    setLog([]);
    setValue('');
    getAnswer();
  }
  
  const checkValue = () => {
    if (Value.length !== 4 || (/[^0-9]/g).test(Value)) {
      setError('4자리 숫자를 입력하세요.');
      return false;
    }
    setError('');
    return true;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!checkValue()) return;

    if (Log.length >= 10) {
      setResult('게임을 다시 시작합니다.');
      clearGame();
      return;
    }

    if (Value === Answer.join('')) {
      setResult(Value + '정답!');
      clearGame();
      return;
    }

    const valueArr = Value.split('').map(v => parseInt(v));
    let strike = 0;
    let ball = 0;
    
    for (let i = 0; i < valueArr.length; i++) {
      if (valueArr[i] === Answer[i]) {
        strike += 1;
      } else if (Answer.includes(valueArr[i])) {
        ball += 1;
      }
    }

    setResult(`${strike} 스트라이크, ${ball} 볼!`);
    setLog(prev => 
      [...prev, `${prev.length + 1}번째 시도, [${Value}] ${strike}/${ball}`]);
    
    if (Log.length >= 9) {
      setResult(prev => prev + ' 실패했습니다.');
    }
  }

  const getAnswer = () => {
    const arr = new Array(10).fill(0).map((_, i) => i);
    const answer = [];

    while (answer.length < 4) {
      const randomNum = Math.floor(Math.random() * arr.length);
      answer.push(arr[randomNum]);
      arr.splice(randomNum, 1);
    }

    setAnswer(answer);
  }

  useEffect(() => {
    getAnswer();
  }, [])

  return (
    <div>
      <h1>BaseBall</h1>
      <p>답 : [{Answer.map((v, i)=> i !== Answer.length - 1 ? v + ',' : v)}]</p>
      <p>결과 : {Result}</p>
      <form onSubmit={onSubmit}>
        <input type='text' name='value' id='value' value={Value} onInput={onInput} />
        <button type='submit'>입력</button>
      </form>
      {Error && <p>{Error}</p>}
      <ul>
        {Log.map((v, i) => (<li key={i}>{v}</li>))}
      </ul>
    </div>
  )
}

export default BaseBall;
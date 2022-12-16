import React, { useState } from 'react';
import Try from './Try';

const getAnswer = () => {
  const arr = new Array(10).fill(0).map((_, i) => i);
  const answer = [];

  while (answer.length < 4) {
    const randomNum = Math.floor(Math.random() * arr.length);
    answer.push(arr[randomNum]);
    arr.splice(randomNum, 1);
  }
  
  return answer;
}

const checkValue = (value) => {
  if (value.length !== 4 || (/[^0-9]/g).test(value)) {
    return '4자리 숫자를 입력하세요.';
  }
  return '';
}

const checkGame = (value, answer) => {
  const valueArr = value.split('').map(v => parseInt(v));
  let strike = 0;
  let ball = 0;
  
  for (let i = 0; i < valueArr.length; i++) {
    if (valueArr[i] === answer[i]) {
      strike += 1;
    } else if (answer.includes(valueArr[i])) {
      ball += 1;
    }
  }

  return {strike: strike, ball: ball};
}

function BaseBall() {
  const [Answer, setAnswer] = useState(getAnswer);
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
    setAnswer(getAnswer());
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const checkValueMsg = checkValue(Value);
    setError(checkValueMsg);
    if (checkValueMsg) return;

    if (Log.length >= 10) {
      setResult('게임을 다시 시작합니다.');
      clearGame();
      return;
    }

    if (Value === Answer.join('')) {
      setResult(Value + ' 홈런! 게임을 다시 시작합니다.');
      clearGame();
      return;
    }

    const {strike, ball} = checkGame(Value, Answer);
    setResult(`${strike} 스트라이크, ${ball} 볼!`);
    setLog(prev => 
      [...prev, {count: prev.length + 1, value: Value, score: `${strike}/${ball}`}]);
    
    if (Log.length >= 9) {
      setResult(prev => prev + ' 실패했습니다.');
    }
  }

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
        {Log.map((v) => (
          <Try key={v.count + v.value} count={v.count} value={v.value} score={v.score} />
        ))}
      </ul>
    </div>
  )
}

export default BaseBall;
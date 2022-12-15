import React, { useRef, useState } from 'react';

function WordRelay() {
  const [Word, setWord] = useState('이유주');
  const [Value, setValue] = useState('');
  const [Result, setResult] = useState('');
  const inputRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (Value.length > 1 && Word[Word.length - 1] === Value[0]) {
      setResult('딩동댕');
      setWord(Value);
      setValue('');
    } else {
      setResult('땡');
    }
    inputRef.current.focus();
  }
  
  const inputValue = (e) => {
    setValue(e.target.value);
  }

  return (
    <div>
      <h1>끝말잇기</h1>
      <p>{Word}</p>
      <form onSubmit={onSubmit}>
        <input type="text" ref={inputRef} value={Value} onInput={inputValue} />
        <button>입력</button>
      </form>
      <p>{Result}</p>
    </div>
  )
}

export default WordRelay;
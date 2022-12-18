import React, { useState } from 'react';

const Form = () => {
  const [RowLength, setRowLength] = useState(10);
  const [CellLength, setCellLength] = useState(10);
  const [Mine, setMine] = useState(20);

  const onInputRow = (e) => {
    setRowLength(e.target.value);
  }

  const onInputCell = (e) => {
    setCellLength(e.target.value);
  }

  const onInputMine = (e) => {
    setMine(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="cell">가로</label>
      <input type="number" name="cell" id="cell" value={CellLength} onInput={onInputCell} />
      <label htmlFor="row">세로</label>
      <input type="number" name="row" id="row" value={RowLength} onInput={onInputRow} />
      <label htmlFor="mine">지뢰</label>
      <input type="number" name="mine" id="mine" value={Mine} onInput={onInputMine} />
      <button>입력</button>
    </form>
  )
}

export default Form;
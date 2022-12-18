import React, { useReducer } from 'react';
import Form from './Form';
import Table from './Table';

const initialState = {
  tableData: [],
  timer: 0,
  result: ''
}

const reducer = (state, action) => {

}

const Minesweeper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {tableData, timer, result} = state;

  return (
    <div>
      <h1>Minesweeper</h1>
      <Form />
      <p>{timer} 초</p>
      <Table />
      {result && 
        <p>{result}</p>
      }
    </div>
  )
}

export default Minesweeper;
import React, { createContext, useMemo, useReducer } from 'react';
import Form from './Form';
import Table from './Table';

export const tableContext = createContext({
  tableData: [],
  dispatch: () => {}
});

export const ACTION = {
  START_GAME: 'START_GAME',
}

export const CODE = {
  OPEND: 0,
  NORMAL: -1,
  MINE: -7,
  FLAG: -2,
  QUESTION: -3,
  FLAG_MINE: -4,
  QUESTION_MINE: -5,
  OPEND_MIND: -6,
}

const initialState = {
  tableData: [],
  timer: 0,
  result: ''
}

const plantMine = (row, cell, mine) => {
  const candidate = Array(row * cell).fill().map((_, i) => {
    return i;
  });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }
  console.log(data);
  return data;
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.START_GAME: 
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine)
      }
    default: 
      return state
  }
}

const Minesweeper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {tableData, timer, result} = state;
  const value = useMemo(() => ({ tableData, dispatch }), [tableData], []);

  return (
    <tableContext.Provider value={value}>
      <h1>Minesweeper</h1>
      <Form />
      <p>{timer} 초</p>
      <Table />
      {result && 
        <p>{result}</p>
      }
    </tableContext.Provider>
  )
}

export default Minesweeper;
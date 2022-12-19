import React, { createContext, useMemo, useReducer } from 'react';
import Form from './Form';
import Table from './Table';

export const tableContext = createContext({
  tableData: [],
  dispatch: () => {}
});

export const ACTION = {
  START_GAME: 'START_GAME',
  OPEN_CELL: 'OPEN_CELL',
  CLICK_MINE: 'CLICK_MINE',
  FLAG_QUESTION: 'FLAG_QUESTION',
  NORMALIZE: 'NORMALIZE',
}

export const CODE = {
  OPENED: 0,
  NORMAL: -1,
  FLAG: -2,
  QUESTION: -3,
  MINE: -11,
  FLAG_MINE: -12,
  QUESTION_MINE: -13,
  OPENED_MIND: -20,
}

const initialState = {
  tableData: [],
  timer: 0,
  result: '',
  halted: false
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
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false,
      }
      
    case ACTION.OPEN_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];

      const checkCell = (row, cell) => {
        let around = [];
        if (tableData[row - 1]) {
          around = around.concat(
            tableData[row - 1][cell - 1],
            tableData[row - 1][cell],
            tableData[row - 1][cell + 1],
          )
        }
        if (tableData[row + 1]) {
          around = around.concat(
            tableData[row + 1][cell - 1],
            tableData[row + 1][cell],
            tableData[row + 1][cell + 1],
          )
        }
        around = around.concat(
          tableData[row][cell - 1],
          tableData[row][cell + 1],
        )

        const count = around.filter(v => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
        tableData[row][cell] = count;

        if (count === 0) {
          const around = [];
          if (tableData[row - 1]) {
            around.push(
              [row - 1, cell - 1],
              [row - 1, cell],
              [row - 1, cell + 1],
            );
          }
          if (tableData[row + 1]) {
            around.push(
              [row + 1, cell - 1],
              [row + 1, cell],
              [row + 1, cell + 1],
            );
          }
          around.push(
            [row, cell - 1],
            [row, cell + 1],
          );
          around
            .filter(v => tableData[v[0]][v[1]])
            .forEach(v => {
              if (![CODE.OPENED, CODE.OPENED_MIND].includes(tableData[v[0]][v[1]])) {
                checkCell(v[0], v[1]);
              }
            });
        }
      }
      checkCell(action.row, action.cell);

      return {
        ...state,
        tableData
      }
    }
    
    case ACTION.CLICK_MINE:{
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.OPENED_MIND;
      return {
        ...state,
        tableData,
        halted: true
      }
    }

    case ACTION.FLAG_QUESTION:{
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] -= 1;
      return {
        ...state,
        tableData
      }
    }

    case ACTION.NORMALIZE:{
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] += 2;
      return {
        ...state,
        tableData
      }
    }

    default: 
      return state
  }
}

const Minesweeper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {tableData, timer, result, halted} = state;
  const value = useMemo(() => ({ tableData, dispatch, halted }), [tableData, halted]);

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
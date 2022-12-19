import React, { createContext, useCallback, useMemo, useReducer } from 'react';
import Table from './Table';

export const tableContext = createContext({
  tableData: [],
  dispatch: () => {}
});

export const ACTION = {
  START_GAME: 'START_GAME',
  CLICK_CELL: 'CLICK_CELL',
}

const initialState = {
  tableData: [],
  isWin: false
}

const setNewGame = (row, cell) => {
  const candidate = Array(row * cell).fill().map((_, i) => i);
  const shuffle = [];
  while (shuffle.length < row * cell) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }

  const tableData = [];
  for (let i = 0; i < row; i++) {
    const rowArr = [];
    tableData.push(rowArr);
    tableData[i] = shuffle.splice(0, row);
  }

  return tableData;
}

const checkWin = (data) => {
  data = data.flat();
  console.log(data);
  for (let i = 0; i < data.length - 1; i++) {
    if (data[i] !== i + 1) return false;
  };
  return true;
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.START_GAME: 
      return {
        ...state,
        tableData: setNewGame(4, 4),
        isWin: false
      }

    case ACTION.CLICK_CELL:
      const tableData = [...state.tableData];
      const curData = tableData[action.row][action.cell];
      let emptyCell;
      let isWin;

      if (tableData[action.row - 1]?.[action.cell] === 0) { // 위
        emptyCell = [action.row - 1, action.cell]
      } else if (tableData[action.row + 1]?.[action.cell] === 0) {  // 아래
        emptyCell = [action.row + 1, action.cell]
      } else if (tableData[action.row][action.cell - 1] === 0) {  // 좌
        emptyCell = [action.row, action.cell - 1]
      } else if (tableData[action.row][action.cell + 1] === 0) {  // 우
        emptyCell = [action.row, action.cell + 1]
      }

      if (emptyCell) {
        tableData[action.row][action.cell] = tableData[emptyCell[0]][emptyCell[1]];
        tableData[emptyCell[0]][emptyCell[1]] = curData;

        if (checkWin(tableData)) {
          isWin = true;
        };
      }

      return {
        ...state,
        tableData,
        isWin
      }
    default: 
      return state
  }
}

const Puzzle = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {tableData, isWin} = state;
  const value = useMemo(() => ({ tableData, dispatch, isWin }), [tableData]);

  const onClickStart = useCallback(() => {
    dispatch({ type: ACTION.START_GAME });
  });

  return (
    <tableContext.Provider value={value}>
      <h1>Puzzle</h1>
      <button onClick={onClickStart}>게임시작</button>
      <Table />
      {isWin && 
        <p>승리!</p>
      }
    </tableContext.Provider>
  )
}

export default Puzzle;
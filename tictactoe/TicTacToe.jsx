import React, { useCallback, useEffect, useReducer } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [['','',''],['','',''],['','','']],
  recentCell: [-1, -1],
  end: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_WINNER':
      return {
        ...state,
        winner: action.winner
      }
    case 'CLICK_CELL':{
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData: tableData,
        recentCell: [action.row, action.cell]
      }
    }
    case 'CHANGE_TURN':
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O'
      }
    case 'END':
      return {
        ...state,
        end: true
      }
  }
}

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {tableData, recentCell, winner, turn, end} = state;

  const setWin = useCallback(() => {
    dispatch({ type: 'SET_WINNER', winner: state.turn });
  }, [])

  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) return;

    let isWin = false;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      isWin = true;
    } else if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      isWin = true;
    } else if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      isWin = true;
    } else if (tableData[2][0] === turn && tableData[1][1] === turn && tableData[0][2] === turn) {
      isWin = true;
    }

    if (isWin) {
      setWin();
      dispatch({ type: 'END' });
    } else {
      let all = true;
      tableData.forEach(row => {
        row.forEach(cell => {
          if (!cell) {
            all = false;
          }
        })
      });
      if (all) {
        dispatch({ type: 'SET_WINNER', winner: 'NOBODY' });
        dispatch({ type: 'END' });
      } else {
        dispatch({ type: 'CHANGE_TURN' });
      }
    }
  }, [recentCell]);

  console.log(state);

  return (
    <>
      <h1>TicTacToe</h1>
      <p>{turn} 님의 차례</p>
      <Table tableData={tableData} dispatch={dispatch} end={end} />
      {winner && (winner === 'NOBODY' ? <p>비겼습니다.</p> : <p>{winner}님의 승리!</p>)}
    </>
  )
}

export default TicTacToe;
import React, { memo, useCallback, useContext, useMemo } from 'react';
import { ACTION, CODE, tableContext } from './Minesweeper';

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: '#444',
      };
    case CODE.OPENED_MIND:
    case CODE.OPENED:
      return {
        background: 'white',
      };
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return {
        background: 'yellow',
      };
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        background: 'red',
      };
    default:
      return {
        background: 'white',
      };
  }
};

const getTdText = (code) => {
  switch (code) {
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return 'X';
    case CODE.OPENED_MIND:
      return '펑';
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '!';
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return '?';
    default:
      return code || '';
  }
};

const Td = memo(({ trIndex, tdIndex }) => {
  const { tableData, dispatch, isHalted } = useContext(tableContext);

  const onClickTd = useCallback(() => {
    if (isHalted) return;
    switch (tableData[trIndex][tdIndex]) {
      case CODE.OPENED:
      case CODE.OPENED_MIND:
      case CODE.FLAG:
      case CODE.FLAG_MINE:
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
        return;
      case CODE.NORMAL:
        dispatch({ type: ACTION.OPEN_CELL, row: trIndex, cell: tdIndex});
        return;
      case CODE.MINE:
        dispatch({ type: ACTION.CLICK_MINE, row: trIndex, cell: tdIndex});
        return;
      default:
        return;
    }
  }, [tableData[trIndex][tdIndex], isHalted]);

  const onRightClickTd = useCallback((e) => {
    e.preventDefault();
    if (isHalted) return;
    switch (tableData[trIndex][tdIndex]) {
      case CODE.NORMAL:
      case CODE.MINE:
      case CODE.FLAG:
      case CODE.FLAG_MINE:
        dispatch({ type: ACTION.FLAG_QUESTION, row: trIndex, cell: tdIndex});
        return;
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
        dispatch({ type: ACTION.NORMALIZE, row: trIndex, cell: tdIndex});
        return;
      default:
        return;
    }
  }, [tableData[trIndex][tdIndex], isHalted]);
  
  return useMemo(() => (
    <td
      style={getTdStyle(tableData[trIndex][tdIndex])}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >{getTdText(tableData[trIndex][tdIndex])}</td>
  ), [tableData[trIndex][tdIndex], isHalted])
});

export default Td;
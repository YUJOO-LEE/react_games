import React, { memo, useCallback, useContext, useMemo } from 'react';
import { ACTION, tableContext } from './Puzzle';

const Td = memo(({ rowIndex, cellIndex }) => {
  const { tableData, dispatch, isWin } = useContext(tableContext);

  const handleClickTd = useCallback(() => {
    if (!isWin && tableData[rowIndex][cellIndex]) {
      dispatch({ type: ACTION.CLICK_CELL, row: rowIndex, cell: cellIndex })
    }
  }, [isWin, tableData[rowIndex][cellIndex]]);

  return useMemo(() => (
    <td onClick={handleClickTd}>
      {tableData[rowIndex][cellIndex]}
    </td>
  ), [isWin, tableData[rowIndex][cellIndex]])
})

export default Td;
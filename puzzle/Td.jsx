import React, { memo, useCallback, useContext, useMemo } from 'react';
import { ACTION, tableContext } from './Puzzle';

const Td = memo(({ rowIndex, cellIndex }) => {
  const { tableData, dispatch, isWin } = useContext(tableContext);
  const tdData = tableData[rowIndex][cellIndex];

  const handleClickTd = useCallback(() => {
    if (!isWin && tdData) {
      dispatch({ type: ACTION.CLICK_CELL, row: rowIndex, cell: cellIndex })
    }
  }, [isWin, tdData]);

  return useMemo(() => {
    return (
    <td onClick={handleClickTd}>
      {tdData || ''}
    </td>
  )}, [isWin, tdData])
})

export default Td;
import React, { memo, useCallback, useContext } from 'react';
import { ACTION, tableContext } from './Puzzle';

const Td = memo(({ rowIndex, cellIndex }) => {
  const { tableData, dispatch } = useContext(tableContext);

  const handleClickTd = useCallback(() => {
    if (tableData[rowIndex][cellIndex]) {
      dispatch({ type: ACTION.CLICK_CELL, row: rowIndex, cell: cellIndex })
    }
  }, []);

  return (
    <td onClick={handleClickTd}>
      {tableData[rowIndex][cellIndex]}
    </td>
  )
})

export default Td;
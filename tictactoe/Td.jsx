import React, { memo, useCallback } from 'react';

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData, end }) => {
  const onClick = useCallback(() => {
    if (end || cellData) return;
    dispatch({ type: 'CLICK_CELL', row: rowIndex, cell: cellIndex });
  }, [cellData, end]);

  return (
    <td onClick={onClick}>{cellData}</td>
  )
})

export default Td;
import React, { memo, useContext } from 'react';
import { tableContext } from './Puzzle';

const Td = memo(({ rowIndex, cellIndex }) => {
  const { tableData } = useContext(tableContext);

  return (
    <td>
      {tableData[rowIndex][cellIndex]}
    </td>
  )
})

export default Td;
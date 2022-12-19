import React, { memo, useContext, useMemo } from 'react';
import { tableContext } from './Puzzle';
import Td from './Td';

const Tr = memo(({ rowIndex }) => {
  const { tableData } = useContext(tableContext);

  return useMemo(() => (
    <tr>
      {Array(tableData[0].length).fill().map((_, i) => {
        return <Td key={'td' + i} rowIndex={rowIndex} cellIndex={i} />
      })}
    </tr>
  ), [rowIndex])
})

export default Tr;
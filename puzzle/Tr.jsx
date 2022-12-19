import React, { memo, useContext } from 'react';
import { tableContext } from './Puzzle';
import Td from './Td';

const Tr = memo(({ rowIndex }) => {
  const { tableData } = useContext(tableContext);

  return (
    <tr>
      {Array(tableData[0].length).fill().map((_, i) => {
        return <Td key={'td' + i} rowIndex={rowIndex} cellIndex={i} />
      })}
    </tr>
  )
})

export default Tr;
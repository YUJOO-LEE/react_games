import React, { memo, useContext } from 'react';
import { tableContext } from './Minesweeper';
import Td from './Td';

const Tr = memo(({ trIndex }) => {
  const { tableData } = useContext(tableContext);

  return (
    <tr>
      {Array(tableData[trIndex].length).fill().map((_, i) => {
        return (
          <Td key={'td' + i} trIndex={trIndex} tdIndex={i} />
        )
      })}
    </tr>
  )
})

export default Tr;
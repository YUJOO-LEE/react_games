import React, { memo, useContext } from 'react'
import { tableContext } from './Minesweeper';
import Tr from './Tr';

const Table = memo(() => {
  const { tableData } = useContext(tableContext);

  return (
    <table>
      <tbody>
        {Array(tableData.length).fill().map((_, i) => (
          <Tr key={'row' + i} trIndex={i} />
        ))}
      </tbody>
    </table>
  )
})

export default Table;
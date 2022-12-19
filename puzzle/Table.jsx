import React, { memo, useContext } from 'react';
import { tableContext } from './Puzzle';
import Tr from './Tr';

const Table = memo(() => {
  const { tableData } = useContext(tableContext);

  return (
    <table>
      <tbody>
        {Array(tableData.length).fill().map((_, i) => {
          return <Tr key={'tr' + i} rowIndex={i} />
        })}
      </tbody>
    </table>
  )
})

export default Table;
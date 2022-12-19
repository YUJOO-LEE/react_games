import React, { useContext } from 'react'
import { tableContext } from './Minesweeper';
import Tr from './Tr';

const Table = () => {
  const { tableData } = useContext(tableContext);

  return (
    <table>
      <tbody>
        {tableData.map((tr, i) => (
          <Tr key={'row' + i} trData={tr} />
        ))}
      </tbody>
    </table>
  )
}

export default Table;
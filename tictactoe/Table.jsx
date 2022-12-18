import React from 'react';
import Tr from './Tr';

const Table = ({ onClick, tableData, dispatch, end }) => {
  return (
    <table onClick={onClick}>
      <tbody>
      {Array(tableData.length).fill().map((_, i) => 
        <Tr key={'tr' + i} rowIndex={i} rowData={tableData[i]} dispatch={dispatch} end={end} />
      )}
      </tbody>
    </table>
  )
}

export default Table;
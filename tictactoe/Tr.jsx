import React, { memo } from 'react'
import Td from './Td';

const Tr = memo(({ rowData, rowIndex, dispatch, end }) => {
  return (
    <tr>
      {Array(rowData.length).fill().map((_, i) => 
        <Td key={'td' + i} rowIndex={rowIndex} cellIndex={i} dispatch={dispatch} cellData={rowData[i]} end={end} />
      )}
    </tr>
  )
})

export default Tr;
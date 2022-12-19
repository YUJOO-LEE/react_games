import React, { memo } from 'react';
import Td from './Td';

const Tr = memo(({ trData }) => {
  return (
    <tr>
      {trData.map((td, i) => {
        return (
          <Td key={'td' + i} tdData={td} />
        )
      })}
    </tr>
  )
})

export default Tr;
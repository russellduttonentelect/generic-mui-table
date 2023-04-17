import { FC } from 'react';
import { Table as MuiTable, TableContainer } from '@mui/material';

export const Table: FC = ({ children }) => {
  return (
    <>
      <TableContainer>
        <MuiTable>{children}</MuiTable>
      </TableContainer>
    </>
  );
};

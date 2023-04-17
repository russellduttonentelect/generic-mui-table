import { TableBody as MuiTableBody, TableCell, TableRow } from '@mui/material';
import { TableRowData } from 'types';

type TableBodyProps<T = TableRowData> = {
  rows: T[];
  renderRow: (row: T, index?: number) => JSX.Element | null;
};

export const TableBody = <T,>({ rows, renderRow }: TableBodyProps<T>) => {
  if (rows.length === 0) {
    <MuiTableBody>
      <TableRow key={1} data-testid={`row-${1}`} sx={{ borderTop: '1pt solid #e0e0e0' }}>
        <TableCell colSpan={-1} align='center'>
          No data to display
        </TableCell>
      </TableRow>
    </MuiTableBody>;
  }

  return <MuiTableBody>{rows.map(renderRow)}</MuiTableBody>;
};

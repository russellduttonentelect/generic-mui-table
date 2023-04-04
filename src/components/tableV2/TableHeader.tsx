import {
  SortDirection,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography
} from '@mui/material';
import { TableHeaderConfig } from '../../types';

type TableHeaderProps = {
  order: SortDirection;
  orderBy: string;
  headers: TableHeaderConfig[];
  handleSort?: (property: string) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
};

export const TableHeader = ({ order, orderBy, headers, handleSort }: TableHeaderProps) => {
  const allowSorting = !!handleSort;
  return (
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableCell
            key={header.key}
            align='left'
            sortDirection={orderBy === header.key ? order : false}
            sx={{
              ...(header.allowGrouping ? { borderRight: 1, borderColor: 'grey.300' } : {})
            }}
          >
            {allowSorting ? (
              <TableSortLabel
                active={orderBy === header.key && allowSorting}
                direction={orderBy === header.key && order ? order : 'asc'}
                onClick={handleSort(header.key)}
                sx={{ fontWeight: '800' }}
              >
                {header.label}
              </TableSortLabel>
            ) : (
              <Typography variant='body2' fontWeight={600}>
                {header.label}
              </Typography>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

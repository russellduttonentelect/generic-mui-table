import { Table } from '@mui/material';
import { render } from '@testing-library/react';
import { TableContextProvider, TableHeader } from '.';

describe('Testing Table Header component rendering', () => {
  test('Should render Table Header correctly with sensible inputs', () => {
    const headers = [
      {
        id: 'id',
        label: 'ID'
      },
      {
        id: 'lot',
        label: 'Lot'
      },
      {
        id: 'name',
        label: 'Product Name'
      }
    ];
    const header = (
      <TableContextProvider>
        <Table>
          <TableHeader headers={headers} handleSort={jest.fn()} order='asc' orderBy='id' />
        </Table>
      </TableContextProvider>
    );

    const { baseElement } = render(header);
    expect(baseElement).toMatchSnapshot();
  });
});

import { render } from '@testing-library/react';
import { TableFooter } from '.';
import { useTableQueryParams } from './hooks';
import { MemoryRouter } from 'react-router-dom';

describe('Table Footer tests', () => {
  test('should render the table footer correctly with sensible parameters', () => {
    const Footer = () => {
      const { page, handlePageChange, pageSize, handlePageSizeChange } = useTableQueryParams({
        defaultPageSize: 10
      });
      return (
        <TableFooter
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
          page={page}
          pageSize={pageSize}
          rowCount={50}
        />
      );
    };

    const { baseElement } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(baseElement).toMatchSnapshot();
  });
});

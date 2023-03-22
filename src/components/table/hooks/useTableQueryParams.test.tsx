import { renderHook, act, WrapperComponent } from '@testing-library/react-hooks';
import { useTableQueryParams } from '.';
import { MemoryRouter } from 'react-router-dom';

test('Testing pagination hook', () => {
  const wrapper: WrapperComponent<unknown> = ({ children }) => (
    <MemoryRouter>{children}</MemoryRouter>
  );

  const { result } = renderHook(() => useTableQueryParams({ defaultPageSize: 10 }), {
    wrapper
  });

  expect(result.current.page).toBe(0);
  expect(result.current.pageSize).toBe(10);

  act(() => {
    result.current.handlePageChange(1);
  });

  expect(result.current.page).toBe(1);
  expect(result.current.pageSize).toBe(10);

  act(() => {
    result.current.handlePageSizeChange(20);
  });

  expect(result.current.page).toBe(0);
  expect(result.current.pageSize).toBe(20);
});

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableFooter, TableHeader } from 'components/tableV2';
import { Paper, TableCell, TableRow } from '@mui/material';
import { PaginatedResponse } from 'types';

type User = {
  id: number;
  name: string;
  username: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

type RequestParams = {
  page: number;
  pageSize: number;
  search: string;
};

const fetchUsers = async ({
  page,
  pageSize,
  search
}: RequestParams): Promise<PaginatedResponse<User>> => {
  const total = await fetch(new URL('https://jsonplaceholder.typicode.com/users'))
    .then((res) => res.json())
    .then((data) => data as User[])
    .then((users) => users.filter((user) => user.name.includes(search)));
  const totalCount = total.length;
  const totalPages = totalCount / pageSize;

  const users = total.slice(page * pageSize, page * pageSize + pageSize);

  return {
    items: users,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 0,
    pageNumber: page,
    totalCount,
    totalPages
  };
};

const headers = [
  {
    key: 'id',
    label: 'User ID'
  },
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'address.city',
    label: 'City'
  }
];

export const Users = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['users', { page, pageSize, search }],
    queryFn: () => fetchUsers({ page, pageSize, search })
  });

  if (isError) {
    return <div>Oh No!</div>;
  }

  if (isLoading) {
    return <div>Still loading...</div>;
  }

  return (
    <Paper sx={{ padding: 2 }}>
      <Table>
        <TableHeader headers={headers} order='asc' orderBy='id' />
        <TableBody
          rows={data.items}
          renderRow={(row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address.city}</TableCell>
            </TableRow>
          )}
        />
      </Table>
      <TableFooter
        page={page}
        pageSize={pageSize}
        rowCount={data.totalCount}
        handlePageChange={setPage}
        handlePageSizeChange={setPageSize}
      />
    </Paper>
  );
};

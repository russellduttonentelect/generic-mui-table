import { Grid, Paper, TextField } from '@mui/material';
import { Table, TableContextProvider } from 'components/table';
import { debounce } from 'lodash';
import { ChangeEvent, useState } from 'react';
import { PaginatedResponse, Request, TableRowData } from '../types';

type Post = {
  id: number;
  title: string;
  userId: number;
  body: string;
};

const headers = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'userId',
    label: 'User ID'
  },
  {
    key: 'title',
    label: 'Title'
  },
  {
    key: 'body',
    label: 'Content'
  }
];

const getPosts = ({ page, pageSize }: Request): Promise<Post[]> => {
  return fetch(new URL('https://jsonplaceholder.typicode.com/posts'))
    .then((response) => response.json())
    .then((data) => data as Post[])
    .then((posts) => posts.slice(page * pageSize, page * pageSize + pageSize));
};

export const Posts = () => {
  const [search, setSearch] = useState('');
  const [tableFilters] = useState<Record<string, string>>({});

  const fetchRows = async ({
    page,
    pageSize,
    search,
    filters
  }: Request): Promise<PaginatedResponse<TableRowData>> => {
    // eslint-disable-next-line no-console
    console.log({ search, filters });
    const posts = await getPosts({ page, pageSize });

    const totalPages = 200 / pageSize;

    return {
      items: posts,
      pageNumber: page,
      totalCount: 200,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 0
    };
  };

  const updateSearch = debounce(
    (event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value),
    300,
    {
      trailing: true
    }
  );
  return (
    <TableContextProvider>
      <Paper sx={{ padding: 2 }}>
        <Grid container spacing={2} display='flex' alignItems='center'>
          <Grid item xs={3} lg={2} />
          <Grid item xs={3} lg={2}>
            <TextField label='Search' onChange={updateSearch} />
          </Grid>
        </Grid>
        <Table headers={headers} fetchRows={fetchRows} search={search} filters={tableFilters} />
      </Paper>
    </TableContextProvider>
  );
};

import { AppLayout } from 'components/AppLayout';
import { Home, NotFound } from 'pages';
import { Posts } from 'pages/Posts';
import { Route, Routes } from 'react-router-dom';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path='posts' element={<Posts />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

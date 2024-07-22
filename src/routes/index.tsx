import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import NotFound from './NotFound';
import SearchResults from './SearchResults';

const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
    children: [
      {
        path: 'profiles/:username',
        element: <Profile />,
        index: true,
      },
    ],
  },
  {
    path: '/search/:byusername',
    element: <SearchResults />,
    index: true,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default BrowserRouter;

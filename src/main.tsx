import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './global.css';
import BrowserRouter from './routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <RouterProvider router={BrowserRouter} />,
  // </React.StrictMode>,
);

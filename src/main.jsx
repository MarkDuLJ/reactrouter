import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from "react-router-dom";

import './index.css'
import Root from './routes/root';
import ErroPage from './error-page';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Root />,
    errorElement:<ErroPage />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

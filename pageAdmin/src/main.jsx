import { StrictMode } from 'react'
import axios from 'axios';
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import PageAdmin from './Components/pageAdmin/PageAdmin.jsx'
import Login from './Components/login/Login.jsx'

axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || 'http://localhost:5002';

axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {path:"/", element:<Login />},
  {path:"/admin", element:<PageAdmin/>},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

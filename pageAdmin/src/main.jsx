import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import PageAdmin from './Components/pageAdmin/PageAdmin.jsx'
import Login from './Components/login/Login.jsx'

const router = createBrowserRouter([
  {path:"/", element:<Login />},
  {path:"/admin", element:<PageAdmin/>},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

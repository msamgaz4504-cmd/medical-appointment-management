import { StrictMode } from 'react';
import axios from 'axios';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from './pages/Home.jsx'; 
import MyProfile from './pages/MyProfile.jsx'; 
import LoginSignup from './pages/LoginSignup.jsx';
import Reservation from './components/Calendar/Reservation.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || 'http://localhost:5002';

axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {path:"/", element:<Home />},
  {path:"/log-in", element:<Login/>},
  {path:"/sign-up", element:<Signup/>},
  {path:"/profil", element:<MyProfile />},
  {path:"/reservation", element:<Reservation />},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

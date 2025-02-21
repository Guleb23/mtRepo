import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import Services from './Components/Screens/Services'
import Documents from './Components/Screens/Documents'
import PersonalData from './Components/Screens/PersonalData'
import Profile from './Components/Screens/Profile'
import AboutObjects from './Components/Screens/AboutObjects'

import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/documents',
    element: <Documents />
  },
  {
    path: '/personalData',
    element: <PersonalData />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/aboutObjects',
    element: <AboutObjects />
  }
]);

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)



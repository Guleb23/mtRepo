import { AuthProvider } from './Context/AuthProvider.jsx'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'


import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'


createRoot(document.getElementById('root')).render(


  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>

)



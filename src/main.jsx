import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppContextProvider from './store/AppContext.jsx'
import Home from './pages/Home.jsx'
import Result from './pages/Result.jsx'
import BuyCredi from './pages/BuyCredit.jsx'
import './index.css'
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children:[
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/result',
        element: <Result/>
      },
      {
        path: '/buyCredit',
        element: <BuyCredi/>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContextProvider>
      <RouterProvider router={router}/>
    </AppContextProvider>
    
  </StrictMode>,
)

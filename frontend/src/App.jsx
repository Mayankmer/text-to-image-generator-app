
import { Outlet } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Login from './components/Login'
import { useContext } from 'react'
import { AppContext } from './store/AppContext'
import { ToastContainer } from 'react-toastify';
function App() {

  const {showLogin} = useContext(AppContext)
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28
    min-h-screen bg-gradient-to-b from-teal-50
    to-orange-50'>
      <ToastContainer position='bottom-right'/>
      <NavBar/>
      {showLogin && <Login/>}
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default App

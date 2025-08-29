
import { Outlet } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {


  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28
    min-h-screen bg-gradient-to-b from-teal-50
    to-orange-50'>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default App

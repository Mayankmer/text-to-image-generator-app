import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'

function App() {


  return (
    <div className='px-4 sm:px-10 md:px lg:px-28
    min-h-screen bg-gradient-to-b from-teal-50
    to-orange-50'>
      <NavBar/>
      <Outlet/>
    </div>
  )
}

export default App

import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'

function NavBar() {
    const [user, setuser] = useState(null);
    const navigate = useNavigate()
  return (
    <div className='flex items-center justify-between py-4'>
       <Link to='/'> <img src={assets.logo} alt="imagify-logo" className='w-28
        sm:w-28 lg-w-40' /></Link>

        <div>
            {user?
            <div>

            </div>
            :
            <div className='flex items-center gap-2 sm:gap-5'>
                <p onClick={()=>navigate('/buyCredit')} className='cursor-pointer'>Pricing</p>
                <button className='bg-zinc-800 text-white px-7 py-2
                sm:px-10 text-sm rounded-full'>Login</button>
            </div>
            }
        </div>
    </div>
    
  )
}

export default NavBar
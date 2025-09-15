import React from 'react'
import { createContext, useState } from 'react'

export const AppContext = createContext()

const AppContextProvider = (props)=>{
    const [user, setuser] = useState(null);

    //to show or hide the login page
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'))

    const [credit, setCredit] = useState(false)

    const backendUrl = import.meta.env.BACKEND_URL

    const value = {
        user, setuser, showLogin, setShowLogin, token, setToken,
        credit, setCredit
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
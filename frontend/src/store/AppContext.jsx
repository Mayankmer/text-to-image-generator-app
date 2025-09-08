import React from 'react'
import { createContext, useState } from 'react'

export const AppContext = createContext()

const AppContextProvider = (props)=>{
    const [user, setuser] = useState(null);

    //to show or hide the login page
    const [showLogin, setShowLogin] = useState(false);

    const value = {
        user, setuser, showLogin, setShowLogin
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
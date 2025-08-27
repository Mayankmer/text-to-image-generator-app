import React from 'react'
import { createContext, useState } from 'react'

export const AppContext = createContext()

const AppContextProvider = (props)=>{
    const [user, setuser] = useState(true);

    const value = {
        user, setuser
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
import React, { useEffect } from 'react'
import { createContext, useState } from 'react'
import { toast } from 'react-toastify';
import axios  from 'axios';
export const AppContext = createContext()
import { useNavigate } from "react-router-dom";

const AppContextProvider = (props)=>{
    const [user, setUser] = useState(null);

    const navigate = useNavigate();
    //to show or hide the login page
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'))

    const [credit, setCredit] = useState(0)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const loadCreditsData = async ()=>{
        try {
            const {data} = await axios.get(backendUrl +'/api/user/credits',
                {headers: {token}}
            )

            if(data.success){
                setCredit(data.credits)
                setUser(data.user)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const generateImage = async (prompt)=>{
        try {
            const {data} = await axios.post(backendUrl+'/api/image/generate-image',{prompt},
                {headers:{token}}
            )

            if(data.success){
                loadCreditsData()
                return data.resultImage
            }else{
                toast.error(data.message)
                loadCreditsData()
                if(data.creditBalance === 0){
                    navigate('/buyCredit')
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() =>{
        if(token){
            loadCreditsData()
        }
    },[token])

    const logout = ()=>{
        localStorage.removeItem('token')
        setToken('')
        setUser(null)
    }
    const value = {
        user, setUser, showLogin, setShowLogin, token, setToken,
        credit, setCredit, loadCreditsData, logout, backendUrl, generateImage
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
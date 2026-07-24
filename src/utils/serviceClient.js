"use client"
import axios from "axios"



export const getToken = () => {
    return localStorage.getItem('token')
}

export const getRefreshToken = () => {
    return localStorage.getItem('refresh')
}

export const getUserProfile = () => {
    return localStorage.getItem('user')
}

export const refreshToken = async (router) => {
    try{
        const response = await axios.post('http://localhost:8000/refresh',{"refresh":getRefreshToken()})
        localStorage.setItem("token",response.data.access)
        return response.data.access
    }
    catch(error){
        router.push('/login')
    }
}


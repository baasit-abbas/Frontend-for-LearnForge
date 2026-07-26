"use client"
import axios from "axios"
import api from "./authClient"
import { toast } from "react-toastify"

export const getToken = () => {
    return localStorage.getItem('token')
}

export const getRefreshToken = () => {
    return localStorage.getItem('refresh')
}

export const getUserProfile = () => {
    return localStorage.getItem('user')
}

export const refreshToken = async () => {
    try{
        const response = await axios.post('http://localhost:8000/refresh',{"refresh":getRefreshToken()})
        localStorage.setItem("token",response.data.access)
        return response.data.access
    }
    catch(error){
        return null
    }
}

export const login = async (data) => {
    try{
        const response = await api.post('login',data)
        console.log(response)
        localStorage.setItem('token',response.data.access)
        localStorage.setItem('refresh',response.data.refresh)
        const user = await api.get('app/getProfile')
        localStorage.setItem('user',user.data)
        return user.data
    }
    catch(error){
        console.log(error)
        toast.error(error.response.data.detail)
    }
}

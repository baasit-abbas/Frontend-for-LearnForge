"use client"
import axios from "axios"
import api from "./authClient"
import { toast } from "@/Components/ui/toast"

export const getToken = () => {
    const token = localStorage.getItem('token')
    if (token == "undefined") {
        return ""
    }
    return token
}

export const getRefreshToken = () => {
    const refresh =  localStorage.getItem('refresh')
    if (refresh == "undefined"){
        return ""
    }
    return refresh
}

export const getUserProfile = () => {
    const user = localStorage.getItem('user')
    if (user == "undefined"){
        return ""
    }
    return user
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
        localStorage.setItem('token',response.data.access)
        localStorage.setItem('refresh',response.data.refresh)
        const user = await api.get('app/getProfile')
        localStorage.setItem('user',JSON.stringify(user.data))
        return user.data
    }
    catch(error){
        console.log(error.response.data)
        if (error.response.data){
            toast.add({title:error.response.data.detail})
        }
        return null
    }
}

export const logout = () => {
    localStorage.setItem('token',"")
    localStorage.setItem('refresh',"")
    localStorage.setItem("user","")
}

import axios  from "axios";
import { getToken , refreshToken } from "./serviceClient";
import dotenv from 'dotenv'
dotenv.config
const url = process.env.NEXT_PUBLIC_API_URL
const api = axios.create({baseURL:url})
api.interceptors.request.use(
config => {
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    response => {return response},
    async error => {
        const originalRequest = error.config
            if (error.response.status == 401 && !originalRequest._retry){
                originalRequest._retry = true
                const newToken = await refreshToken()
                if (newToken){
                    originalRequest.headers.Authorization = `Bearer ${newToken}`
                    return api(originalRequest)
                }
        }
        return Promise.reject(error);
    }   
)

export default api

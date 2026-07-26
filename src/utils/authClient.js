import axios  from "axios";
import { getToken , refreshToken , getRefreshToken } from "./serviceClient";

const url = 'http://localhost:8000/'
const headers = {
    'Content-Type':'application/json'
}
const api = axios.create({baseURL:url,headers:headers})
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
                const newToken = await refreshToken(getRefreshToken())
                if (newToken){
                    originalRequest.headers.Authorization = `Bearer ${newToken}`
                    return api(originalRequest)
                }
                throw new Error('Refresh token expired')
        }
        return Promise.reject(error);
    }   
)

export default api

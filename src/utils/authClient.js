import axios  from "axios";
import { getToken , refreshToken , getRefreshToken } from "./serviceClient";

url = 'http://localhost:8000/'
token = getToken()
headers = {
    'Content-Type':'application/json'
}
api = axios.create({baseURL:url,headers:headers})
api.interceptors.request.use(
config => {
    const token = getToken()
    config.headers.Authorization = `Bearer ${token}`
    return config
})

api.interceptors.response.use(
    response => {return response},
    async error => {
        const originalRequest = error.config
            if (error.response.status == 401){
            const newToken = refreshToken(getRefreshToken())
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            return this.api(originalRequest)
        }
         return Promise.reject(error);
    }   
)

export default api

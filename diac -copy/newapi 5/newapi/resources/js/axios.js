import axios from 'axios'
import router from './router'   // 👈 apna router path check karo

/* ================================
   CREATE AXIOS INSTANCE
================================ */

const api = axios.create({
    baseURL: '/api',
    headers:{
        'Accept':'application/json'
    }
})

/* ================================
   REQUEST INTERCEPTOR
   🔥 हर request में token inject करेगा
================================ */

api.interceptors.request.use(config => {

    const token = localStorage.getItem('token')

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

/* ================================
   RESPONSE INTERCEPTOR
   🔥 अगर token expire हुआ → auto logout
================================ */

api.interceptors.response.use(
    res => res,
    err => {

        if(err.response && err.response.status === 401){

            console.warn('Token expired — Logging out')

            localStorage.removeItem('token')
            localStorage.removeItem('role')

            router.push('/login')
        }

        return Promise.reject(err)
    }
)

export default api
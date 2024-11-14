import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";

export const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
})

// Añadir un interceptor para incluir el token en cada petición
instance.interceptors.request.use((config) => {
    const token = getTokenFromLocalStorage()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

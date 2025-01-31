import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

// Crear una instancia de Axios con configuración global
const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para incluir el token en cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const isLoggedIn = () => {
  return localStorage.getItem("token") != "" &&  localStorage.getItem("token") != null;
}

export default api;
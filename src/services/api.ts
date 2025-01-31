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

api.interceptors.response.use(
  response => response, // retorna la respuesta exitosa
  async error => {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(error);
    }
    return Promise.reject(error); // Para todos los demás errores, se retorna el error original
  }
);

export const isLoggedIn = () => {
  return localStorage.getItem("token") != "" &&  localStorage.getItem("token") != null;
}

export default api;
import axios from "axios";
import api from "./api";

const API_URL = "http://127.0.0.1:8000/api";

export const register = (name: string, email: string, password: string) => {
    return axios.post(`${API_URL}/register`, { name, email, password });
};

export const login = (email: string, password: string) => {
    return axios.post(`${API_URL}/login`, { email, password });
};
//verifica que el token siga válido
export const validateToken = () => {
    return api.get(`/validate-token`,);
};
//Acá cierro la sesiíon
export const logout = async () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
        console.error("No hay token disponible para cerrar sesión");
        return;
    }

    try {
        await axios.post(
            `${API_URL}/logout`,
            {}, // Cuerpo vacío
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        localStorage.removeItem("token");
    } catch (error) {
        console.error("Error al cerrar sesión", error);
    }
};

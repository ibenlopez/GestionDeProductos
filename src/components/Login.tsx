import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error de inicio de sesión", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-primary">Iniciar Sesión</h2>
            <form className="card p-4 shadow">
                <input className="form-control mb-3" type="email" placeholder="Correo" />
                <input className="form-control mb-3" type="password" placeholder="Contraseña" />
                <button className="btn btn-success">Ingresar</button>
            </form>
        </div>
    );
}

export default Login;

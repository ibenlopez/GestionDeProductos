import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

//Para iniciar sesión
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            localStorage.setItem("token", response.data.access_token);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error de inicio de sesión", error);
        }
    };

    return (
        <div className="container pt-5">
            <div className="row justify-content-center">
            <div className="col-lg-6">
            <h2 className="text-info">Iniciar Sesión</h2>
            <form className="card p-4 shadow" onSubmit={handleSubmit}>
                <input
                className="form-control mb-3"
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                className="form-control mb-3"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className="btn btn-info" type="submit">Ingresar</button>
            </form>
            </div>
            </div>
        </div>
    );
}

export default Login;

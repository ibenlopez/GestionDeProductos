import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

//para registrar

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(name, email, password);
            navigate("/login");
        } catch (error) {
            console.error("Error al registrarse", error);
        }
    };

    return (
        <div className="container pt-5">
            <div className="row justify-content-center">
            <div className="col-lg-6">
            <h2 className="text-info">Registro</h2>
            <form className="card p-4 shadow" onSubmit={handleSubmit}>
                <input
                className="form-control mb-3"
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                <button className="btn btn-info" type="submit">Registrarse</button>
            </form>
            </div>
            </div>
        </div>
    );
}

export default Register;

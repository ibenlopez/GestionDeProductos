import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem("token");
            navigate("/login");
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };

    
    return (
        <nav>
            <Link to="/">Home</Link>
            {token ? (
                <>
                    <Link to="/dashboard">Dashboard</Link>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
}

export default Navbar;
